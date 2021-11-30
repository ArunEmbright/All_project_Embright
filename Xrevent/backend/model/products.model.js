var mongoose = require ('mongoose');

var ProductSchema = mongoose.Schema({
    exhibitor:{
        type:String
    },
    productName:{
        type:String
    },
    pickTags:{
        type: String
    },
    location:{
        type: String
    },
    description:{
        type:String,
    },
    _userId:{
        type: mongoose.Types.ObjectId,
        require: true
    }
    
    
})

const Product = mongoose.model('Product', ProductSchema);
module.exports = {Product}