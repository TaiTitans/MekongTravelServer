const express = require('express')
const router = express.Router()
const TinhThanhController = require('../controllers/tinhthanh.controller')


router.get('/getAll', TinhThanhController.getAll)
router.get('/getOne/:_id', TinhThanhController.getOne)

//DiaDiem
router.post('/addDiaDiem/:maTinh', TinhThanhController.addDiaDiem)
router.delete('/deleteDiaDiem/:maTinh/:diaDiemId', TinhThanhController.xoaDiaDiem);
router.put('/updateDiaDiem/:maTinh/:diaDiemId', TinhThanhController.chinhSuaDiaDiem);
router.get('/getAllDiaDiem', TinhThanhController.getAllDiaDiem)
router.get('/getDiaDiemByMaTinh/:maTinh', TinhThanhController.getDiaDiemByMaTinh)
router.get('/getDiaDiemById/:diaDiemId', TinhThanhController.getDiaDiemById)
//AmThuc
router.post('/addMonAn/:maTinh', TinhThanhController.addAmThuc)
router.delete('/deleteMonAn/:maTinh/:amThucId', TinhThanhController.xoaMonAn);
router.put('/updateMonAn/:maTinh/:amThucId', TinhThanhController.chinhSuaMonAn);
router.get('/getAllAmThuc', TinhThanhController.getAllAmThuc)
router.get('/getAmThucByMaTinh/:maTinh', TinhThanhController.getAmThucByMaTinh)
router.get('/getMonAnById/:amThucId', TinhThanhController.getAmThucById)


module.exports = router