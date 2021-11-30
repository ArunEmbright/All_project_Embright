var mongoose = require ('mongoose');

const ExhibitorSchema = new mongoose.Schema({
    events:{
        type: String
    },
    firstName:{
        type: String
    },
    lastName:{
        type:String
    },
    startDate:{
        type: String
    },
    endDate:{
        type:String
    },
    exhibitorTags:{
        type:String,
    },
    companyName:{
        type: String
    },
    email:{
        type: String
    },
    phoneNumber:{
        type:Number
    },
    _userId:{
        type: mongoose.Types.ObjectId,
        require: true
    }
})

const Exhibitor = mongoose.model('Exhibitor', ExhibitorSchema);
module.exports = {Exhibitor}