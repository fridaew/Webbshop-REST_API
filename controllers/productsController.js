const router = require('express').Router();
const productModel = require ('../models/productsModel')
const auth = require('../authentication/auth')

// router.post('/', auth.verifyToken,productModel.createNewProduct) //'veryfyToken'måste den vara med??
router.post('/',productModel.createNewProduct) //'veryfyToken'måste den vara med??

router.get('/',productModel.getAllProducts)// 'veryFytoken'måste den vara med??

router.get('/:id', productModel.getProductById)

router.put('/:id', productModel.updateProduct)

router.delete('/:id', productModel.deleteProduct)



module.exports = router;

