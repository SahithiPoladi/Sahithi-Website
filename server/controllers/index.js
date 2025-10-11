const services = require('../services');

async function getSkillSet(req, res) {
    try {
        console.log(`Entering getSkillSet controller`);
        const query = { ...req.query };
        const result = await services.getSkillSets(query);
        console.log(`Successfully returned Skills data`);
        res.json(result);
    } catch (err) {
        console.error('Error in getSkillSet controller:', err);
        res.status(500).json({ error: err.message });
    }
}

async function getExperience(req, res) {
    try {
        console.log(`Entering getExperience controller`);
        const query = { ...req.query };
        const result = await services.getExperiences(query);
        console.log(`Successfully returned Experience data`);
        res.json(result);
    } catch (err) {
        console.error('Error in getExperience controller:', err);
        res.status(500).json({ error: err.message });
    }
}

async function getContactInfo(req, res) {
    try {
        console.log(`Entering getContactInfo controller`);
        const query = { ...req.query };
        const result = await services.getContactInfo(query);
        console.log(`Successfully returned Contact Info data`);
        res.json(result);
    } catch (err) {
        console.error('Error in getContactInfo controller:', err);
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    getSkillSet,
    getExperience,
    getContactInfo,
};
