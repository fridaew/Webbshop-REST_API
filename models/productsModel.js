const Product = require('../schemas/productSchema')

exports.createNewProduct =(req,res)=>{
    const {name, description, price, imageURL} = req.body;

    if(!name || !description || !price || !imageURL){
        res.status(400).json({
            message: 'You need to enter'
        })
        return
    }
    
    Product.create({ name, description, price, imageURL})
    .then(data=>{
    res.status(201).json(data)
    
    })

    .catch(err =>{
            res.status(500).json({
            message: 'Sometgin went wrong when creating the product',
            err: err.message
        })
        return
    
    })
}


exports.getAllProducts =(req,res)=>{
    Product.find()
    .then(data =>{
        res.status(201).json(data)
    })
    .catch(err => {
        res.status(500).json({
            message: 'Something went wrong when getting the products'
        })
    })
}


exports.getProductById = (req,res) =>{
    Product.findById(req.params.id)
    .then(data =>{
        res.status(201).json(data)
    })
    .catch(err => {
        res.status(500).json({
            message: 'Something went wrong when getting the products'
        })
    })
}


exports.updateProduct = (req,res) => {

    Product.findByIdAndUpdate(req.params.id, req.body, { new: true})
    .then(data => {
        if(!data) { //funkar inte??
          return res.status(404).json({
             message: 'Could not find that product'
            })
        }
        res.status(200).json(data)
      })
      .catch(() => {
        res.status(500).json({
          message: 'Someting went wrong when updating the product'
        })
      })
}

exports.deleteProduct = (req,res) => {

    Product.findByIdAndDelete(req.params.id)
    .then(data => {
        if(!data) { //funkar inte??
          return res.status(404).json({
             message: 'Could not find that product'
            })
        }
        res.status(200).json({id: data._id})
      })
      .catch(() => {
        res.status(500).json({
          message: 'Someting went wrong when updating the product',
          err: err.message
        })
      })
}









