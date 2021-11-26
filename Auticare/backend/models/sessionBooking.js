const mongoose = require('mongoose');

const SessionBookingSchema = new mongoose.Schema({
    userId: {
        type: String
    },
   
    therapistName:{
        type:String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },

    patientName: {
        type: String
    },

    relationType: {
        type: String
    },
    mobileNumber: {
        type: Number
    },
    
    age: {
        type: Number
    },
    email: {
        type: String,
        
        minlength: 1,
        trim: true,
        //unique: true

    },

    SessionBookingAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    _userId: {
        type: mongoose.Types.ObjectId,
        require: true
      },

})
const SessionBooking = mongoose.model('SessionBooking', SessionBookingSchema);

module.exports = { SessionBooking };