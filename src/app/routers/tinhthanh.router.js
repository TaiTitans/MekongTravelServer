const express = require('express')
const router = express.Router()
const TinhThanhController = require('../controllers/tinhthanh.controller')


router.post('/create', TinhThanhController.add)
router.delete('/delete/:_id', TinhThanhController.delete)
router.get('/getAll', TinhThanhController.getAll)
router.get('/get/:_id', TinhThanhController.get)


module.exports = router