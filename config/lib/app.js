const express = require('./express');
const mongoose = require('./mongoose');
const chalk = require('chalk');
const config = require('../config');
const mysql = require('./mysql');

exports.init = (callback) => {
    const app = express.init();
    const connection = mysql.mysqlConnection();
    //mongo DB
    mongoose.dbInit(config.db.uri);

    //MySql DB
    connection.connect();

    //disconnect
    connection.end();
    callback(app);
};

module.exports.start = function() {
    this.init((app) => {
      app.listen(config.port, config.host, () => {
        /**
         * Logging initialization
         */
        console.log('--');
        console.log();
        console.log(chalk.white(config.app.title));
        console.log();
        console.log(chalk.yellow(`Environment: ${process.env.NODE_ENV}`));
        console.log(chalk.green(`Server: ${(process.env.NODE_ENV === 'secure' ? 'https://' : 'http://')}${config.host}:${config.port}`));
        console.log(chalk.cyan(`Main database: ${config.db.uri}`));
        console.log(chalk.blue(`MySql database: ${config.mysql.database}/ host:${config.mysql.host}/port:${config.mysql.port}`));
        console.log('--');
      });
    });
  };