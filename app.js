const express = require('express')
const app = express()
const cors = require('cors');

//MIDDLEWARE
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


//CONTROLLERS
app.use('/api/products', require('./controllers/productsController'))
app.use('/api/users', require('./controllers/userController'))
app.use('/api/orders', require('./controllers/orderController'))

module.exports = app





