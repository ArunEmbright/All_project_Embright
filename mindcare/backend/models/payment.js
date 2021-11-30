const mongoose = require('mongoose');

const paymentSchema= new mongoose.Schema({
    orderId:{
        tyep:String
    },
    amount:{
        type:String
    },
    currency:{
        type:String
    },
    receipt:{
        type:String
    },
    payment_captuere:{
        type:Boolean
    }
})
const Payment = mongoose.model('payment', paymentSchema);

module.exports = Payment;