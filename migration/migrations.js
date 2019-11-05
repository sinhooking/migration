const chalk = require('chalk');
const fs = require('fs');

exports.migrationInit = (cb) => {
    return new Promise((resolve, reject) => {
    const memberMigration = require('./member.migration');
    //add another migration module variable;
    
    /**
     * middleware
     */
    const migrationEnd = require('./middleware/migrationEndPoint');
    console.log('--')
    console.log('migration initialize successfully')
    
    /**
     * if add another migration 
     *  use promise reolve method chaining
     */
    memberMigration.memberMigration()
        //.then(exampleMigration)
        .then(() => {
            migrationEnd('success');
            if (cb) { return cb(); }
        })
        .catch((err) => {
            console.log(err);
            if (cb) {
                cb(err);
            }
        });
    })
}