/* eslint-disable no-console */
'use strict';
require('colors');

const mongoose = require('mongoose');
const config = require('./environment');
const Promise = require('promise');

module.exports.connect = () => {
  mongoose.Promise = Promise;
  mongoose.connect(config.mongo.uri, config.mongo.options);

  mongoose.connection
    .on('connected', () => console.log(`Mongoose default connection open to ${config.mongo.uri}`.cyan))
    .on('error', (err) => console.log(`Mongoose default connection error  ${err}`.red))
    .on('disconnected', () => console.log('Mongoose default connection disconnected'.yellow));

  process.on('SIGINT', () => {
    mongoose.connection.close(() => process.exit(0));
  });
};
