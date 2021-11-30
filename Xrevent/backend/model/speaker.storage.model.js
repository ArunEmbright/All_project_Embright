var mongoose = require ('mongoose');


const SpeakerStorageSchema = new mongoose.Schema({
   
  img:{
      type:String
  },
  _userId:{
      type: mongoose.Types.ObjectId,
      require: true
  }
})

const SpeakerStorage = mongoose.model('SpeakerStorage', SpeakerStorageSchema);
module.exports = {SpeakerStorage}