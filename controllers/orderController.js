const router = require('express').Router();
const orderModel = require ('../models/orderModel')
const auth = require('../authentication/auth')


router.post('/', auth.verifyToken,orderModel.createOrder) 
router.get('/', auth.verifyToken,orderModel.getAllOrders) 

module.exports = router;