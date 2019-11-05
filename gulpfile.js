const gulp = require('gulp');
const app = require('./config/lib/app');

gulp.task('migration', (done) => {
    const migration = require('./migration/migrations');
    app.start();
    migration.migrationInit(done)
    .then(() => {
        done();
    });
}) 

gulp.task('dropdb', (done) => {
    // Use mongoose configuration
    const mongooseService = require('./config/lib/mongoose');
    const config = require('./config/config');
    console.log('database target: ',config.db.uri);
    mongooseService.dbInit(config.db.uri, (db) => {
        db.dropDatabase((err) => {
            if (err) {
                console.log(err, 'dddd');
            } else {
                console.log('Successfully dropped db: ', db.databaseName);
            }
            done();
        });
    });
});