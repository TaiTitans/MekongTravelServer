const express = require('express')
const router = express.Router()
const TinhThanhController = require('../controllers/tinhthanh.controller')


router.get('/getAll', TinhThanhController.getAll)
router.get('/getOne/:_id', TinhThanhController.getOne)
router.post('/add/:maTinh', TinhThanhController.addDiaDiem)
router.delete('/delete/:maTinh/:tenDiaDiem', TinhThanhController.xoaDiaDiem);
router.put('/update/:maTinh/:tenDiaDiem', TinhThanhController.chinhSuaDiaDiem);

module.exports = router