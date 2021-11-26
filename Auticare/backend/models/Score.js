const mongoose = require("mongoose");

const ScoreSchema = new mongoose.Schema({

  sum: {
    type: String,
    required: true,
  },
  patientName: {
    type: String
  },
  age: {
    type: Number
  },
  userId:{
    type:String
}, 
degreeOfAutism:{
  type:String
},
  _userId: {
    type: mongoose.Types.ObjectId,
    require: true
  },

});

const Score = mongoose.model('Score', ScoreSchema);

module.exports = { Score }