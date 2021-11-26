const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    userId: {
        type: String
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
    appointmentAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    _userId: {
        type: mongoose.Types.ObjectId,
        require: true
      },


})
const Appointment = mongoose.model('Appointment', AppointmentSchema);

module.exports = { Appointment };