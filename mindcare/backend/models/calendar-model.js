const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({

    title:{
        type:String
    },
    date:{
        type:String
    },
    time:{
        type:String
    },
    _userId:{
        type: mongoose.Types.ObjectId,
         require: true
    }
}) 

const CalendarEvent = mongoose.model("event",eventSchema );

module.exports = CalendarEvent