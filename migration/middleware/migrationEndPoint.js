const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
function createMigrationLog(logData) {
    const date = new Date();
    fs.writeFile(`${path.resolve('migration/log')}/${yyyymmdd(date)}.json`, JSON.stringify(logData), (err) => {
        if (err) { console.log(chalk.red(err)); }
        else { 
            console.log('===============================================================');
            console.log(chalk.blue('migration data log saved')); 
            console.log('===============================================================');
        }
    });
}

function yyyymmdd(dateIn) {
    var yyyy = dateIn.getFullYear();
    var mm = dateIn.getMonth()+1; // getMonth() is zero-based
    var dd  = dateIn.getDate();
    return String(10000*yyyy + 100*mm + dd); // Leading zeros for mm and dd
 }

const modelsArr = [];
/**
 * @description
 *  if migration success out log & create json file
 */
module.exports = (modelsName) => {
    console.log(chalk.blue('====================================================='));
    console.log(modelsName);
    console.log(chalk.blue('====================================================='));
    if(modelsName !== 'success') {
        modelsArr.push(modelsName);
    } else {
        console.log('===============================================================');
        console.log();
        console.log(chalk.yellow(`@@@@@@ migration successfully @@@@@@`));
        console.log();
        console.log(chalk.green(`@@@@@@ migration successfully @@@@@@`));
        console.log();
        console.log(chalk.blue(`@@@@@@ migration successfully @@@@@@`));
        console.log();
        console.log('===============================================================');
        
        createMigrationLog(modelsArr);
    }
}
