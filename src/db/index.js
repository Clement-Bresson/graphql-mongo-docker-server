const mongoose = require('mongoose');

const createModels = require('./models');

const dbName =
  process.env.NODE_ENV === 'development' ? 'database-test' : 'database';

const url = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${
  process.env.MONGO_INITDB_ROOT_PASSWORD
}@${dbName}:27017/greeno?authMechanism=SCRAM-SHA-1&authSource=admin`;

const options = {
  useNewUrlParser: true,
  reconnectTries: 60,
  reconnectInterval: 1000
};

module.exports = function createStore() {
  mongoose.connect(url, options);

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:')); //eslint-disable-line
  db.once('open', function() {
    console.log('Connected to mongodb'); //eslint-disable-line
  });

  const models = createModels(mongoose);

  return models;
};
