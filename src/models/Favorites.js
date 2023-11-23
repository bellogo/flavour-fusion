
const mongoose = require('mongoose');

const FavouriteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  edamam_uri: { type: String, required: true },
});

module.exports = mongoose.model('Favourite', FavouriteSchema);
