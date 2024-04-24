const express = require('express')
const router = express.Router()
const AmThucController = require('../controllers/amthuc.controller')


router.post('/create', AmThucController.create)
router.delete('/delete/:_id', AmThucController.delete)
router.get('/getAll', AmThucController.getAll)
router.get('/get/:_id', AmThucController.get)
router.get('/getByTinhThanh/:tinhThanhID', AmThucController.getAmThucTheoTinhThanh)
router.post('/search', AmThucController.searchAmThuc)

module.exports = router