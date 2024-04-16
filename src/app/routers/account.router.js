const express = require('express');
const router = express.Router();
const AccountController = require('../controllers/taikhoan.controller')

router.post('/register', AccountController.dangky)
router.post('/login', AccountController.dangnhap)

module.exports = router