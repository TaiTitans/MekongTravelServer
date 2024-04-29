const express = require('express');
const router = express.Router();
const CustomerController = require('../controllers/customer.controller')

router.post('/register', CustomerController.dangky)
router.post('/login', CustomerController.dangnhap)

module.exports = router