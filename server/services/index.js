const { getDb, dbCollections } = require('../config');

/**
 * Fetch skill sets from the configured collection.
 * @param {Object} query - MongoDB find query
 * @returns {Promise<Array>} array of skill documents
 */
async function getSkillSets(query = {}) {
    try {
        console.log(`Entering getSkillSets service function`);
        const db = getDb();
        const skills = await db.collection(dbCollections.skillSetCollection).find(query).toArray();
        if (!skills) {
            throw new Error('No skills found');
        } else {
            return {
                count: skills.length,
                skills: skills,
                message: 'Skills fetched successfully'
            }
        }
    } catch (err) {
        console.error('Error in getSkillSets service:', err);
        throw err;
    }
}

/**
 * Fetch sexperience data from the configured collection.
 * @param {Object} query - MongoDB find query
 * @returns {Promise<Array>} array of experience documents
 */
async function getExperiences(query = {}) {
    try {
        console.log(`Entering getExperiences service function`);
        const db = getDb();
        const experiences = await db.collection(dbCollections.experienceCollection).find(query).toArray();
        if (!experiences) {
            throw new Error('No experiences found');
        } else {
            return {
                count: experiences.length,
                experiences: experiences,
                message: 'Experiences fetched successfully'
            }
        }
    } catch (err) {
        console.error('Error in getExperiences service:', err);
        throw err;
    }
}

/**
 * Fetch Contact info from the configured collection.
 * @param {Object} query - MongoDB find query
 * @returns {Promise<Array>} array of contact info documents
 */
async function getContactInfo(query = {}) {
    try {
        console.log(`Entering getContactInfo service function`);
        const db = getDb();
        const contactInfo = await db.collection(dbCollections.contactCollection).find(query).toArray();
        if (!contactInfo) {
            throw new Error('No contact info found');
        } else {
            return {
                count: contactInfo.length,
                contactInfo: contactInfo,
                message: 'Contact info fetched successfully'
            }
        }
    } catch (err) {
        console.error('Error in getContactInfo service:', err);
        throw err;
    }
}

/**
 * Fetch About Me info from the configured collection.
 * @param {Object} query - MongoDB find query
 * @returns {Promise<Array>} array of about me documents
 */
async function getAboutMe(query = {}) {
    try {
        console.log(`Entering getAboutMe service function`);
        const db = getDb();
        const aboutMe = await db.collection(dbCollections.aboutMeCollection).find(query).toArray();
        if (!aboutMe) {
            throw new Error('No about me info found');
        } else {
            return {
                count: aboutMe.length,
                aboutMe: aboutMe,
                message: 'About me info fetched successfully'
            }
        }
    } catch (err) {
        console.error('Error in getAboutMe service:', err);
        throw err;
    }
}

/**
 * Persist a contact form submission to the contact collection.
 * @param {Object} submission - { name, email, subject, message, ip, userAgent, createdAt }
 * @returns {Promise<Object>} insertedId and message
 */
async function saveContact(submission = {}) {
    try {
        console.log('Entering saveContact service function');
        if (!submission || typeof submission !== 'object') {
            throw new Error('Invalid submission object');
        }
        const db = getDb();
        const doc = {
            name: submission.name || '',
            email: submission.email || '',
            subject: submission.subject || '',
            message: submission.message || '',
            ip: submission.ip || null,
            userAgent: submission.userAgent || null,
            createdAt: submission.createdAt || new Date(),
        };

        const result = await db.collection(dbCollections.contactCollection).insertOne(doc);
        return {
            insertedId: result.insertedId,
            message: 'Contact submission saved successfully',
        };
    } catch (err) {
        console.error('Error in saveContact service:', err);
        throw err;
    }
}

module.exports = {
    getSkillSets,
    getExperiences,
    getContactInfo,
    getAboutMe,
    saveContact,
};
