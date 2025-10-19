#!/usr/bin/env bash
set -euo pipefail

# Unified FE+BE image deployer using AWS CLI to ECR/ECS
# Usage: set env vars below or pass as arguments. Example:
#   REGION=us-east-2 ACCOUNT_ID=283141160547 ECR_REPO=sahithi-portfolio ECS_CLUSTER=portfolio-cluster ECS_SERVICE=portfolio-service ./scripts/deploy-unified.sh
# Optional: IMAGE_TAG (default: git short SHA), PORT (default: 5000), CONTAINER_NAME (default: first container), FORCE_PORT (default: false)

REGION="${REGION:-us-east-2}"
ACCOUNT_ID="${ACCOUNT_ID:-}"         # e.g. 283141160547
ECR_REPO="${ECR_REPO:-sahithi-portfolio}"  # unified repo name
ECS_CLUSTER="${ECS_CLUSTER:-}"        # existing ECS cluster
ECS_SERVICE="${ECS_SERVICE:-}"        # existing ECS service to update
IMAGE_TAG="${IMAGE_TAG:-}"
PORT="${PORT:-5000}"
CONTAINER_NAME="${CONTAINER_NAME:-}"
FORCE_PORT="${FORCE_PORT:-false}"

if [[ -z "${ACCOUNT_ID}" || -z "${ECS_CLUSTER}" || -z "${ECS_SERVICE}" ]]; then
  echo "ACCOUNT_ID, ECS_CLUSTER, and ECS_SERVICE are required via env vars." >&2
  exit 1
fi

if [[ -z "${IMAGE_TAG}" ]]; then
  if git rev-parse --short HEAD >/dev/null 2>&1; then
    IMAGE_TAG="$(git rev-parse --short HEAD)"
  else
    IMAGE_TAG="$(date +%Y%m%d%H%M%S)"
  fi
fi

ECR_URI="${ACCOUNT_ID}.dkr.ecr.${REGION}.amazonaws.com/${ECR_REPO}"
IMAGE="${ECR_URI}:${IMAGE_TAG}"

# 1) Ensure ECR repo exists
aws ecr describe-repositories --repository-names "${ECR_REPO}" --region "${REGION}" >/dev/null 2>&1 || \
  aws ecr create-repository --repository-name "${ECR_REPO}" --region "${REGION}" >/dev/null

# 2) Login to ECR
aws ecr get-login-password --region "${REGION}" | docker login --username AWS --password-stdin "${ACCOUNT_ID}.dkr.ecr.${REGION}.amazonaws.com"

# 3) Build image
DOCKER_BUILDKIT=1 docker build \
  --build-arg REACT_APP_API_BASE_URL=/api/v1 \
  -t "${IMAGE}" .

# 4) Push image
docker push "${IMAGE}"

echo "Pushed image: ${IMAGE}"

# 5) Get current task definition for service
SERVICE_DESC=$(aws ecs describe-services --cluster "${ECS_CLUSTER}" --services "${ECS_SERVICE}" --region "${REGION}")
TASK_DEF_ARN=$(echo "$SERVICE_DESC" | jq -r '.services[0].taskDefinition')

if [[ -z "${TASK_DEF_ARN}" || "${TASK_DEF_ARN}" == "null" ]]; then
  echo "Could not resolve current task definition for service ${ECS_SERVICE}" >&2
  exit 1
fi

# 6) Fetch current task def JSON
TASK_DEF=$(aws ecs describe-task-definition --task-definition "$TASK_DEF_ARN" --region "${REGION}" --query 'taskDefinition')

# 7) Create new container definition pointing to our new image while preserving other settings
#    - If CONTAINER_NAME is set, only update that container; otherwise update the first container
#    - By default do NOT override portMappings; set FORCE_PORT=true to map to $PORT
if [[ -n "${CONTAINER_NAME}" ]]; then
  NEW_CONTAINER_DEFS=$(echo "$TASK_DEF" | jq \
    --arg IMAGE "$IMAGE" \
    --argjson PORT ${PORT} \
    --arg NAME "$CONTAINER_NAME" \
    --arg FORCE "$FORCE_PORT" \
    '.containerDefinitions | map(if .name == $NAME then (.image = $IMAGE | (.portMappings = (if $FORCE == "true" then ([{containerPort: $PORT, protocol: "tcp"}]) else .portMappings end)) | .essential = true) else . end)')
else
  NEW_CONTAINER_DEFS=$(echo "$TASK_DEF" | jq \
    --arg IMAGE "$IMAGE" \
    --argjson PORT ${PORT} \
    --arg FORCE "$FORCE_PORT" \
    '(.containerDefinitions) as $defs | $defs 
      | to_entries
      | map(if .key == 0 then (.value.image = $IMAGE | (.value.portMappings = (if $FORCE == "true" then ([{containerPort: $PORT, protocol: "tcp"}]) else .value.portMappings end)) | .value.essential = true) else .value end)')
fi

FAMILY=$(echo "$TASK_DEF" | jq -r '.family')
EXECUTION_ROLE_ARN=$(echo "$TASK_DEF" | jq -r '.executionRoleArn')
TASK_ROLE_ARN=$(echo "$TASK_DEF" | jq -r '.taskRoleArn')
NETWORK_MODE=$(echo "$TASK_DEF" | jq -r '.networkMode')
REQUIRES_COMPATIBILITIES=$(echo "$TASK_DEF" | jq -r '.requiresCompatibilities[]' | jq -R . | jq -s .)
CPU=$(echo "$TASK_DEF" | jq -r '.cpu')
MEMORY=$(echo "$TASK_DEF" | jq -r '.memory')
VOLUMES=$(echo "$TASK_DEF" | jq -c '.volumes')

# 8) Register new task def revision
NEW_TASK_DEF=$(jq -n \
  --arg FAMILY "$FAMILY" \
  --arg EXECUTION_ROLE_ARN "$EXECUTION_ROLE_ARN" \
  --arg TASK_ROLE_ARN "$TASK_ROLE_ARN" \
  --arg NETWORK_MODE "$NETWORK_MODE" \
  --arg CPU "$CPU" \
  --arg MEMORY "$MEMORY" \
  --argjson REQUIRES_COMPATIBILITIES "$REQUIRES_COMPATIBILITIES" \
  --argjson VOLUMES "$VOLUMES" \
  --argjson CONTAINER_DEFS "$NEW_CONTAINER_DEFS" \
  '{family: $FAMILY, executionRoleArn: $EXECUTION_ROLE_ARN, taskRoleArn: $TASK_ROLE_ARN, networkMode: $NETWORK_MODE, requiresCompatibilities: $REQUIRES_COMPATIBILITIES, cpu: $CPU, memory: $MEMORY, volumes: $VOLUMES, containerDefinitions: $CONTAINER_DEFS}')

NEW_TASK_DEF_ARN=$(aws ecs register-task-definition \
  --region "${REGION}" \
  --cli-input-json "${NEW_TASK_DEF}" \
  --query 'taskDefinition.taskDefinitionArn' --output text)

echo "Registered task def: ${NEW_TASK_DEF_ARN}"

# 9) Update service to new task def
aws ecs update-service \
  --cluster "${ECS_CLUSTER}" \
  --service "${ECS_SERVICE}" \
  --task-definition "${NEW_TASK_DEF_ARN}" \
  --region "${REGION}" >/dev/null

echo "Service update started. Watching deployment..."

# 10) Wait for service stability
aws ecs wait services-stable --cluster "${ECS_CLUSTER}" --services "${ECS_SERVICE}" --region "${REGION}"

echo "Deployment successful: ${ECS_SERVICE} now running ${NEW_TASK_DEF_ARN}"
