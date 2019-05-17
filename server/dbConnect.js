const mongoose = require('mongoose');

const dbName = (function getDbName() {
  switch (process.env.NODE_ENV) {
    case 'production':
      return 'database';
    case 'development':
      return 'database-development';
    case 'test':
      return 'database-test';
  }
})();

const autoIndex = (function getAutoIndex() {
  switch (process.env.NODE_ENV) {
    case 'production':
      return false;
    case 'development':
    case 'test':
      return true;
  }
})();

const url = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${
  process.env.MONGO_INITDB_ROOT_PASSWORD
}@${dbName}:27017/${
  process.env.MONGO_INITDB_DATABASE
}?authMechanism=SCRAM-SHA-1&authSource=admin`;

const options = {
  useNewUrlParser: true,
  reconnectTries: 60,
  reconnectInterval: 1000,
  autoIndex
};

module.exports = (function dbConnect() {
  mongoose.connect(url, options);

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:')); //eslint-disable-line
  db.once('open', function() {
    console.log('Connected to mongodb'); //eslint-disable-line
  });
})();
