const path = require('path');
const config = require('../config');
const mongoose = require('mongoose');
const chalk = require('chalk');

exports.dbInit = (dbHost, cb) => {
  mongoose.Promise = global.Promise;
  
  require('../../models/member.models');
  
  /**
   * check mongoose ver  
   */
  mongoose.connect(dbHost, {
      // useNewUrlParser: true,
      useMongoClient: true
    })
    .then((connection) => {
      if (cb) {
        cb(connection.db);
      }
    })
    .catch(error => console.error(error));
};

exports.disconnectDb = (cb) => {
  mongoose.connection.close((err) => {
    console.log('Mongoose connection disconnected');
    if (cb) { cb(err); }
  });
};
