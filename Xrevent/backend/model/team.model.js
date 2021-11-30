var mongoose = require('mongoose');

var TeamSchema = new mongoose.Schema({
    exhibitor:{
        type: String
    },
    firstName:{
        type: String
    },
    lastName:{
        type: String
    },
    email: {
        type: String
    },
    phoneNumber: { type: Number},
    designation: {
        type: String
    },
    _userId:{
        type: mongoose.Types.ObjectId,
        require: true
    }
});


const Team = mongoose.model('Team', TeamSchema);
module.exports = {Team} 