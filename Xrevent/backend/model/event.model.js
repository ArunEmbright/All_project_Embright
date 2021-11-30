var  mongoose = require ('mongoose');

var EventSchema = mongoose.Schema({
    exhibitor:{
        type:String
    },
    organizer:{
        type:String
    },
    eventName:{
        type: String
    },
    startDate:{
        type: String
    },
    endDate:{
        type: String
    },
    location:{
        type:String
    },
    _userId:{
        type: mongoose.Types.ObjectId,
        // require: true
    }


})

const Event = mongoose.model('Event', EventSchema);
module.exports = {Event}