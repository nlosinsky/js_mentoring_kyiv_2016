'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
require('colors');

const express = require('express');
const app = module.exports = express();
const db = require('./config/mongoose');
const config = require('./config/environment');
const path = require('path');

// Connect to database
db.connect();

//set secret for JWT authorization
app.set('superSecret', config.secret);

//setup template engine settings
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views/pages'));

// Setup server
require('./config/express')(app);
require('./routing/routes')(app);


// Start server
app.listen(config.port, () => {
  console.log(`Express server listening on ${config.port}, in ${app.get('env')} mode`.cyan);
});
