# Sahithi Website

This is a React portfolio app. I added a small Express + MongoDB backend in the `server/` folder to make this a full-stack application.

Mobile responsiveness

- The app is fully responsive across phones, tablets, and desktops. Navigation becomes a hamburger menu on small screens.
- Typography is fluid using CSS clamp() so headings and paragraphs scale by viewport.
- The Work timeline stacks vertically under 768px; the central line is hidden for clarity.
- You can tweak breakpoints and sizes in `src/index.css` and `src/components/NavBar/index.css`.

Getting started

1. Install client dependencies (from project root):

   ```bash
   npm install
   ```

2. Install server dependencies:

   ```bash
   cd server
   npm install
   ```

Run the app

- Start the React client (from project root):

  ```bash
  npm start
  ```

- Start the server (from project root):

  ```bash
  npm run start:server
  ```

Or run both in development (client with CRA and server with nodemon). The `dev` script uses `npm-run-all`; if not installed, run the two commands in separate terminals:

  ```bash
  # terminal 1
  npm start

  # terminal 2
  cd server && npm run dev
  ```

Seeding the DB (local MongoDB required)

From the `server/` folder run:

```bash
npm run config
```

Configuration

Create a `.env` file inside `server/` (or set env vars) with:

```
MONGO_URI=mongodb://127.0.0.1:27017/sahithi_portfolio
PORT=5000
```

API endpoints

- GET /api/items
- GET /api/items/:id
- POST /api/items
- PUT /api/items/:id
- DELETE /api/items/:id

From the client you can fetch `/api/items` (when developing, the client runs on 3000 and server on 5000). Consider adding a `proxy` field to the root `package.json` or use absolute URLs when deploying.

If you'd like, I can add example client code to call these APIs and show items in the React UI.
1. Clone the project and run `npm install` on the project.
2. Once the node_modules are created please run `npm start` and the application will start in a local server

Docker Compose (production)

You can run the app and a MongoDB instance together using Docker Compose. Steps:

1. Copy the example env file and edit values as needed:

  ```bash
  cp .env.example .env
  # edit .env to set CLIENT_ORIGIN and SCHEDULER_ENABLED as required
  ```

2. Start in detached mode (builds image using the repository `Dockerfile`):

  ```bash
  docker-compose up -d --build
  ```

3. Check logs or view containers:

  ```bash
  docker-compose ps
  docker-compose logs -f web
  ```

Notes:
- The server will be available on port 5000 by default (map: host:5000 -> container:5000).
- The compose file defines a `mongo` service; by default the server connects to `mongodb://mongo:27017` when using the provided `.env`.
- For production deployments behind a reverse proxy, set `CLIENT_ORIGIN` to your frontend domain and configure TLS at the proxy layer.

## Deployment (Unified FE + BE Docker image)

This repository builds a single image that serves both the API (/api/v1) and the static React build. The container listens on port 5000 and exposes a health endpoint at /health.

- ECR repositories (already created):
  - 283141160547.dkr.ecr.us-east-2.amazonaws.com/sahithi-portfolio (unified)
  - 283141160547.dkr.ecr.us-east-2.amazonaws.com/sahithi-portfolio-backend (legacy)

### One-command deploy with AWS CLI

Prereqs:
- AWS CLI v2 configured with access to the target account/region
- jq, docker installed
- An existing ECS cluster and service to update

Export the following and run the script:

```bash
export REGION=us-east-2
export ACCOUNT_ID=283141160547
export ECR_REPO=sahithi-portfolio
export ECS_CLUSTER=<your-ecs-cluster>
export ECS_SERVICE=<your-ecs-service>
# optional
export IMAGE_TAG=$(git rev-parse --short HEAD)
export PORT=5000

./scripts/deploy-unified.sh
```

The script will:
1) Ensure the ECR repo exists
2) Log in to ECR
3) Build the Docker image from this repo
4) Push it to ECR with the chosen tag
5) Create a new ECS task definition revision, pointing to the new image and mapping containerPort 5000
6) Update the ECS service to the new task definition
7) Wait until the service is stable

Notes:
- If your service uses an Application Load Balancer, set the target group health check path to /health and port to traffic port.
- If you are migrating from separate FE/BE tasks to this unified image, update the service to only run this task and set desired count appropriately.
- The server serves the React app in production and mounts the API at /api/v1. During the build we set REACT_APP_API_BASE_URL=/api/v1.

### Rollback

In ECS, choose the previous task definition revision and update the service to use it. Or re-run the script with IMAGE_TAG set to a previous tag.
