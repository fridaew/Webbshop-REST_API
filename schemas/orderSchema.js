const mongoose = require('mongoose');


const orderRowSchema = mongoose.Schema ({

    productId : {type: mongoose.Types.ObjectId, required:true},
    quantity : {type: Number, default: 1 }
    
})

const orderSchema = mongoose.Schema ({

    userId : {type: mongoose.Types.ObjectId, ref: 'User'},
    orders : {type: [orderRowSchema] }
    
})


module.exports = mongoose.model('Order', orderSchema)