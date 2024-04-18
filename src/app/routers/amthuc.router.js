const express = require('express')
const router = express.Router()
const AmThucController = require('../controllers/amthuc.controller')


router.post('/create', AmThucController.create)
router.delete('/delete/:_id', AmThucController.delete)
router.get('/getAll', AmThucController.getAll)
router.get('/get/:_id', AmThucController.get)


module.exports = router