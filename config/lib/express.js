const express = require('express');
const config = require('../config');

/**
 * initialize express middleware
 */
exports.init = () => {
    const app = express();
    
    return app;
};
