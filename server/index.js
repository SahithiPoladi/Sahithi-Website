const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const { connectToDb, getDb } = require('./config');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Allow configuring the client origin via env (defaults to allowing localhost:3000 during dev)
const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:3000';

let db;

connectToDb((err) => {
    if (err) {
        console.error('Failed to connect to database. Continuing to start server in degraded mode.');
    } else {
        try {
            db = getDb();
        } catch (e) {
            console.error('Error retrieving DB instance after connection:', e && e.message);
        }
    }

    // middleware
    app.use(cors({ origin: clientOrigin }));
    app.use(express.json());
    app.use(morgan('dev'));

    // lightweight health check for load balancers / ECS
    app.get('/health', (req, res) => {
        res.status(200).json({ status: 'ok', uptime: process.uptime(), db: !!db });
    });

    // mount routes under /api/v1
    const routers = require('./routes');
    app.use('/api/v1', routers);

    // Serve the React build in production
    if (process.env.NODE_ENV === 'production') {
        const buildPath = path.join(__dirname, '..', 'build');
        app.use(express.static(buildPath));
        // For any other route, serve index.html so client-side routing works
        app.get('*', (req, res) => {
            res.sendFile(path.join(buildPath, 'index.html'));
        });
    }

    const server = app.listen(port, async () => {
        console.log(`Server running on port ${port}${db ? '' : ' (DB not connected)'}`);

        // start optional background scheduler for sending emails, only if DB is connected
        if (db) {
            try {
                const scheduler = require('./emailScheduler');
                if (scheduler && scheduler.isEnabled && scheduler.isEnabled()) {
                    scheduler.start().catch((err) => {
                        console.error('Failed to start email scheduler:', err && err.message);
                    });
                } else {
                    console.log('Email scheduler not enabled (set SCHEDULER_ENABLED=true to enable)');
                }
            } catch (err) {
                console.error('Error while initializing email scheduler:', err && err.message);
            }
        } else {
            console.log('Skipping scheduler start because DB is not connected.');
        }
    });

    server.on('error', (err) => {
        if (err && err.code === 'EADDRINUSE') {
            console.error(`Port ${port} is already in use. Please stop the process using it or set a different PORT.`);
        } else {
            console.error('Server error:', err);
        }
        process.exit(1);
    });
});