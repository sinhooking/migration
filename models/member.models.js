const mongoose = require('mongoose');
const path = require('path');
const config = require(path.resolve('./config/config'));

/**
 * initialize Member Schema
 */
const MemberSchema = new mongoose.Schema({
  // define your Schema
});

module.exports = mongoose.model('Member', MemberSchema, 'users');
