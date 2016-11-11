'use strict';

const CONST = require('./constants/constants');
const DICTIONARY = require('./constants/dictionary');

process.env.NODE_ENV = process.env.NODE_ENV || CONST.ENV.DEV;
require('colors');

const express = require('express');
const app = module.exports = express();
const db = require('./config/mongoose');
const config = require('./config/environment');
const path = require('path');

// Connect to database
db.connect();

//set secret for JWT authorization
app.set(CONST.TOKEN.SECRET.KEY, config.secret);

//set path for static resources
app.use(express.static(path.join(config.root, 'dist')));

// Setup server
require('./config/express')(app);
require('./routing/routes')(app);


// Start server
app.listen(config.port, () => {
  console.log(DICTIONARY.PARAMS.SERVER.LISTENING(config.port, app.get('env')).cyan);
});
