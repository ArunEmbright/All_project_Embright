const mongoose = require('mongoose');

const LocationSchema= new mongoose.Schema({
    location:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'College',
        required:true
    },
  
})
const LocationModel = mongoose.model('LocationModel', LocationSchema);

module.exports = {LocationModel};