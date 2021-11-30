var mongoose = require('mongoose');

var AssetSchema = new mongoose.Schema({
    exhibitor:{
        type: String
    },
    title:{
        type: String
    },
    createType:{
        type: String
    },
    _userId:{
        type: mongoose.Types.ObjectId,
        require: true
    }
});


const Asset = mongoose.model('Asset', AssetSchema);
module.exports = {Asset}