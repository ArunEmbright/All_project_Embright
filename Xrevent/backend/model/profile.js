const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
  image: { type: String, required: true },
});

module.exports = mongoose.model('Profile', profileSchema);
