const express = require('express');
const router = express.Router();
const FeedbackController = require('../controllers/feedback.controller')

router.post('/create', FeedbackController.create)
router.get('/getAll', FeedbackController.getAll)
router.put('/update', FeedbackController.update)



module.exports = router