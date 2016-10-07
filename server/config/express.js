'use strict';

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const errorHandler = require('errorhandler');
const methodOverride = require('method-override');
const multer = require('multer');
const upload = multer();

module.exports = (app) => {
  let env = app.get('env');

  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());
  app.use(upload.array());
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(morgan('dev'));

  if ('development' === env) {
    app.use(errorHandler());
  }
};