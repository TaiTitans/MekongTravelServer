const express = require('express')
const router = express.Router()
const DiaDiemController = require('../controllers/diadiem.controller')


router.post('/create', DiaDiemController.create)
router.put('/update', DiaDiemController.update)
router.delete('/delete/:_id', DiaDiemController.delete)
router.get('/getAll', DiaDiemController.getAll)
router.get('/get/:_id', DiaDiemController.get)
router.get('/getByTinhThanh/:tinhThanhID', DiaDiemController.getDiaDiemTheoTinhThanh)
router.post('/search', DiaDiemController.searchDiaDiem)

module.exports = router