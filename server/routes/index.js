const express = require('express');
const router = express.Router();
const controller = require('../controllers');

router.get('/skills', controller.getSkillSet);
router.get('/experience', controller.getExperience);
router.get('/contact', controller.getContactInfo);

module.exports = router;
