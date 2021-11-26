const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');


const UserSchema = new mongoose.Schema({

    firstName:{
        type: String
    },
    lastName:{
        type: String
    },
    email: {
        type: String,
        
    },
    location:{
        type:String,
    },
    phoneNumber:{
        type:String
       
    },
    college:{
        type: String
    },
    registerNo:{
        type: String
    },
    guardianFirstName:{
        type: String
    },
    guardianLastName:{
        type: String
    },
    guardianEmail:{
        type: String
    },
    guardianPhoneNumber:{
        type: String
    },
    department:{
        type: String
    },
    year:{
        type: String
    },
    PaymentMode:{
        type: String
    },
  
    
  
    _userId:{
        type: mongoose.Types.ObjectId,
        require: true
    },
    
});

const User = mongoose.model('User', UserSchema);

module.exports = { User }







