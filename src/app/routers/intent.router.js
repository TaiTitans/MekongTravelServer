const express = require('express');
const router = express.Router();
const intentController = require('../controllers/intent.controller');
router.post('/intents', intentController.createIntent);
router.get('/intents', intentController.getIntents);
router.get('/intents/:id', intentController.getIntentById);

module.exports = router