const mysql = require('mysql');
const config = require('../config');
const chalk = require('chalk');

exports.mysqlConnection = () => {
    try {
        const connection = mysql.createConnection(config.mysql);
        
        return connection;
    } catch (error) {
        return error;
    }
}