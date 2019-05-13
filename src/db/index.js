const mongoose = require('mongoose');

const createModels = require('./models');

module.exports = function createStore() {
  mongoose.connect('mongodb://localhost/greeno', { useNewUrlParser: true });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:')); //eslint-disable-line
  db.once('open', function() {
    console.log('Connected to mongodb'); //eslint-disable-line
  });

  const models = createModels(mongoose);

  return models;
};
