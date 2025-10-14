FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY server/package*.json ./
RUN npm ci --only=production || npm install --production

# Bundle app source
COPY server/ ./

ENV NODE_ENV=production

EXPOSE 3005

CMD ["node", "index.js"]
