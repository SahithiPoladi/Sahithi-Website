const express = require('express');
const morgan = require('morgan');
const { connectToDb, getDb } = require('./config');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

let db;

connectToDb((err) => {
    if (!err) {
        // middleware
        app.use(express.json());
        // request logging
        app.use(morgan('dev'));

        // mount routes under /api/v1
        const routers = require('./routes');
        app.use('/api/v1', routers);

        const server = app.listen(port, () => {
            console.log(`Server running on port ${port}`);
            db = getDb();
        });

        server.on('error', (err) => {
            if (err && err.code === 'EADDRINUSE') {
                console.error(`Port ${port} is already in use. Please stop the process using it or set a different PORT.`);
            } else {
                console.error('Server error:', err);
            }
            process.exit(1);
        });
    } else {
        console.error('Failed to connect to database. Server not started.');
    }
});