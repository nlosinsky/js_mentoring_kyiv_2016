'use strict';

require('colors');

const DICTIONARY = require('../constants/dictionary');

const mongoose = require('mongoose');
const config = require('./environment');
const Promise = require('promise');

module.exports.connect = () => {
  mongoose.Promise = Promise;
  mongoose.connect(config.mongo.uri, config.mongo.options);

  mongoose.connection
    .on('connected', () => console.log(DICTIONARY.PARAMS.MONGOOSE.CONNECTED(config.mongo.uri).cyan))
    .on('error', (err) => console.log(DICTIONARY.PARAMS.MONGOOSE.ERROR(err).red))
    .on('disconnected', () => console.log(DICTIONARY.MONGOOSE.DISCONNECTED.yellow));

  process.on('SIGINT', () => {
    mongoose.connection.close(() => process.exit(0));
  });
};
