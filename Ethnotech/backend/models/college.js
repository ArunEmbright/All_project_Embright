const mongoose = require('mongoose');

const CollegeSchema= new mongoose.Schema({
    
    college:{
        type:String
    },
    location:{
        type:String
    },
    amount:{
        type:Number

    }
})
const CollegeModel = mongoose.model('College', CollegeSchema);

module.exports = {CollegeModel}; 