'use strict';

const mongodbUri = require('mongodb-uri');
const uri = mongodbUri.formatMongoose({
  scheme: 'mongodb',
  hosts: [
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT
    }
  ],
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

module.exports = {
  ip: process.env.IP || undefined,
  mongo: {
    uri: uri
  }
};