const mysql = require('../config/lib/mysql');
const connection = mysql.mysqlConnection();

/**
 * models loaded
 */
const Member = require('../models/member.models');

/**
 * custome middleware
 */
const migrationEnd = require('./middleware/migrationEndPoint');
const configCondition = require('./migrationOption/memberConfig');


/**
 * @description 
 *  check field data
 * @param {*} migration 
 * @returns {Object} chengeOption
 */
function rdbmsRowData(chengeOption) {
  return new Promise((resolve, reject) => {
    if (!chengeOption) {
      return reject(new Error('change option is not exists'));
    }

    const { migrationOption, row } = chengeOption;
    const loopendPoint = migrationOption.condition.length;
    migrationOption.condition.foreach((conditionObject, index) => {

      if (conditionObject[defineIf]) {
        conditionObject.changeTarget = conditionObject.changedValue;
      }

      if(index === loopendPoint) {
        return resolve({
          migrationOption,
          row
        });
      }
    });
  });
}

/**
 * @description 
 *  set migration object
 * @param {*} migration 
 * @returns {Object} chengeOption
 */
function setMigration (chengeOption) {
  return new Promise((resolve, reject) => {
    if (!chengeOption) {
      return reject(new Error('chengeOption object is not exists'))
    }
    const { migrationOption, row } = chengeOption;
    const migration = {};
    
    for (const key in migrationOption.NoSQLMatchKey) {
      migration[migrationOption.NoSQLMatchKey[key]] = row[key];
    }
    
    return resolve(migration);
  });
}

/**
 * @description 
 *  create member
 * @param {*} migration 
 * @returns {Object} saved member 
 */
function saveMember(migration) {
  return new Promise((resolve, reject) => {
    const member = new Member(migration);
    member.save(function (err, savedMember) {
      if (err) {
        return reject(err);
      }
      return resolve(savedMember);
    });
  });
}

/**
 * @description loop for member schema
 * @param {*} memberQueryArr 
 * @returns {Object} log data
 */
function loopMember(err, memberQueryArr, fields) {
  return new Promise((resolve, reject) => {
    if (err) {
      return reject(err);
    }
    let counters = 0;

    memberQueryArr.map(row => {
    
      const changedRow = configCondition(row);

      rdbmsRowData({changedRow , row})
      .then(setMigration)
      .then(saveMember)
      .then((savedMember) => {
        counters++;
        if (counters === memberQueryArr.length) {
          return resolve({
            modelsName: "Member",
            totalCount: counters,
            checkRowOptions: {
              //migration log keyword
            }
          })
        }
      })
      .catch((err) => {
        return reject(err);
      });
    })
  });
}

exports.memberMigration = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * from example_users';
    connection.connect();
    connection.query(query, loopMember)
      .then((logObject) => {
        migrationEnd(logObject);
        connection.end();
        return resolve();
      })
      .catch(err => {
        return reject(err);
      })
  });
}
