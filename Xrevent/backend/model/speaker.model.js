var mongoose = require ('mongoose');

const SpeakerSchema = new mongoose.Schema({
    title:{
        type:String
    },
    firstName:{
        type:String
    },
    phoneNumber:{
        type: Number
    },
    img:{
        type:String
    },
    company:{
        type: String
    },
    designation:{
        type: String
    },
    
    _userId:{
        type: mongoose.Types.ObjectId,
        require: true
    }
})

const Speaker = mongoose.model('Speaker', SpeakerSchema);
module.exports = {Speaker}


