const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017';
const dbName = process.env.MONGO_DB_NAME || 'sahithi_portfolio';

let _db;

async function connectToDb(callback) {
    try {
        const client = new MongoClient(uri);
        await client.connect();
        _db = client.db(dbName);
        console.log('Connected to MongoDB');
        callback(null);
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        callback(err);
    }
}

function getDb() {
    if (!_db) {
        throw new Error('Database not initialized. Call connectToDb first.');
    }
    return _db;
}

// database collections
const dbCollections = {
    skillSetCollection: process.env.SKILLS_COLLECTION || 'skillSet',
    experienceCollection: process.env.EXPERIENCE_COLLECTION || 'experience',
    contactCollection: process.env.CONTACT_COLLECTION || 'contactMe',
    aboutMeCollection: process.env.ABOUT_ME_COLLECTION || 'aboutMe',
};

module.exports = {
    connectToDb,
    getDb,
    dbCollections
};
