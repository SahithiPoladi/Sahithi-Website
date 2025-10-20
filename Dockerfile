########## Stage 1: Build React client ##########
FROM node:18-alpine AS client-build
WORKDIR /app

# Install client deps
COPY package*.json ./
RUN npm ci || npm install

# Copy source and build client
COPY ./ ./
# Default to same-origin API in production; override via build-arg if needed
ARG REACT_APP_API_BASE_URL=/api/v1
ENV REACT_APP_API_BASE_URL=${REACT_APP_API_BASE_URL}
RUN npm run build

########## Stage 2: Runtime - NGINX serves static React build ##########
FROM nginx:1.25-alpine AS runtime

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy client build to nginx's html directory
COPY --from=client-build /app/build /usr/share/nginx/html

EXPOSE 80

# Default CMD provided by nginx image runs: nginx -g 'daemon off;'

########## Previous Node.js runtime (commented out as requested) ##########
# FROM node:18-alpine AS node-runtime
# WORKDIR /usr/src/app
# COPY server/package*.json ./
# RUN npm ci --only=production || npm install --production
# COPY server/ ./
# COPY --from=client-build /app/build /usr/src/build
# ENV NODE_ENV=production
# EXPOSE 5000
# RUN apk add --no-cache curl
# HEALTHCHECK --interval=30s --timeout=5s --retries=3 CMD sh -c 'PORT=${PORT:-5000}; curl -fsS http://localhost:${PORT}/health || exit 1'
# CMD ["node", "index.js"]
