const Order = require('../schemas/orderSchema')
exports.createOrder = (req,res)=>{

    const {productId, quantity} = req.body

    if(!productId){
        res.status(400).json({
            message: 'You need to enter a product'
        })
        return
    }
    if(!quantity){
        res.status(400).json({
            message: 'You need to add quantity'
        })
        return
    }
  

    const order = new Order({ userId: req.userData._id, orders:{productId,quantity}});
    
    order.save()
        .then(data =>{
            res.status(201).json(data)
        })
        .catch(err =>{
            res.status(500).json({
                message: 'Something went wrong when creating an order'
            })
        })    
}


exports.getAllOrders =(req,res)=>{

    Order.find({ userId: req.userData._id})
    .then(data =>{
        res.status(201).json(data)
    })
    .catch(err => {
        res.status(500).json({
            message: 'Something went wrong when getting the orders'
        })
    })
}



