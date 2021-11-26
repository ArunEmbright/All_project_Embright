const mongoose = require('mongoose');

const paymentSchema= new mongoose.Schema({
    firstName:{
        type: String
    },
  
    email: {
        type: String,
        
    },
   
    payment_id:{
        type:String
    },
    amount:{
        type:String
    },
    
 
})
const Payment = mongoose.model('payment', paymentSchema);

module.exports = Payment;