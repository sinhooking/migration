/**
 * @description
 *    get model row
 * @param {String} keyword 
 *    find option
 * @return 
 *    Member row
 */
const Member = require('../../models/member.models');
module.exports = (keyword) => {
    return new Promise((resolve, reject) => {
        Member.findOne({
          username: keyword
        }, (err, user) => {
          if (err || !user) {
            return reject(null);
          }
          return resolve(user);
        });
      })
}