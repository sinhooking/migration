module.exports = {
  app: {
    title: 'migration project',
    description: 'migration database'
  },
  port : process.env.PORT ||3000,
  host: process.env.HOST || '0.0.0.0',
  db: {
    promise: global.Promise,
    uri: process.env.MONGOHQ_URL || process.env.MONGODB_URI || `mongodb://${process.env.DB_1_PORT_27017_TCP_ADDR || `localhost`}/example`,
  },
  mysql: {
    host: 'localhost',
    user: 'root',
    password: '1234',
    port: '3306',
    database: 'example'
  },
};
