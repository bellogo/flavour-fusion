
const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  ingredients: { type: [String]},
  instructions: { type: [String]},
  source: { type: String },
  source_url: { type: String },
  calories: { type: String },
  video: { type: String },

});

module.exports = mongoose.model('Recipe', recipeSchema);
