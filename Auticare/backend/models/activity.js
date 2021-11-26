const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema({
    activityId: {
        type: String,
        required: true,
    },
    activityName: {
        type: String
    },
    typeOfAutism: {
        type: String
    },
    skillArea: {
        type: String
    },
    activityPath: {
        type: String
      },
      CreatedOn: {
        type: Date,
        required: true,
        default: Date.now,
    },
    
});

const Activity = mongoose.model('Activity', ActivitySchema);

module.exports = { Activity }