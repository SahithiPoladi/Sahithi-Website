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

########## Stage 2: Runtime - Node server serves API + static ##########
FROM node:18-alpine AS runtime
WORKDIR /usr/src/app

# Install server deps (production only)
COPY server/package*.json ./
RUN npm ci --only=production || npm install --production

# Copy server source
COPY server/ ./

# Copy client build where server expects it: path.join(__dirname, '..', 'build') -> /usr/src/build
COPY --from=client-build /app/build /usr/src/build

ENV NODE_ENV=production
EXPOSE 5000

# The server reads PORT from env (defaults to 5000) and serves static build in production
CMD ["node", "index.js"]
