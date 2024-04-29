const express = require('express');
const router = express.Router();
const messageHistoryController = require('../controllers/message.controller');

router.post('/message-history', messageHistoryController.createMessageHistory);
router.get('/message-history', messageHistoryController.getMessageHistory);
router.get('/message-history/:id', messageHistoryController.getMessageHistoryById);

module.exports = router