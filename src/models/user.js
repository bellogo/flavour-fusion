// User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  is_verified: {type: Boolean, default: false}
  // Add other user-related fields as needed
});

module.exports = mongoose.model('User', userSchema);
