const mongoose = require('mongoose');
const { Schema } = mongoose;

// https://grokonez.com/node-js/mongoose-many-to-many-related-models-with-nodejs-express-mongodb

// Create new schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
    enum: ['ADMIN', 'DEFAULT', 'GUEST'],
  },

  avatar: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },

  confirmed: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model('users', UserSchema);
module.exports = User;
