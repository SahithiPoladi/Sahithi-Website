# Server

Endpoints are mounted under the /api/v1 base path.

Available endpoints:
- GET /api/v1/skills — returns skill set documents from the configured MongoDB collection (env: ITEMS_COLLECTION)

Logging:
- Request logging: morgan in 'dev' mode
- Controller/service: console.log/console.error for query and result counts

Run locally:

```bash
# from server/ directory
npm install
npm run dev   # requires nodemon
# or
npm start
```

Environment variables (see .env):
- MONGO_URI — MongoDB connection URI
- MONGO_DB_NAME — database name
- ITEMS_COLLECTION — collection name for skills (default: skillSet)
- PORT — server port (default: 5000)
