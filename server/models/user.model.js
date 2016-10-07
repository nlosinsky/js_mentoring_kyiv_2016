'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let userSchema = new Schema({
  name: String,
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {  //todo make it encrypted
    type: String,
    required: true
  },
  tickets: Array,
  admin: Boolean,
  location: String,
  meta: {
    age: Number,
    website: String
  },
  created_at: Date,
  updated_at: Date
});

module.exports = mongoose.model('User', userSchema);