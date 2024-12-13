const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['vendedor', 'comprador'] },
  createdAt: { type: Date, default: Date.now }
});


const User = mongoose.model('User', userSchema);
module.exports = User;

