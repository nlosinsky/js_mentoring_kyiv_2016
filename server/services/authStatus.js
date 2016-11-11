'use strict';

const DICTIONARY = require('../constants/dictionary');
const CONST = require('../constants/constants');

const jwt = require('jsonwebtoken');
const app = require('./../app');
const Promise = require('promise');

exports.auth = (req) => {
  return new Promise((resolve, reject) => {
    let token;
    let authHeader = req.headers[CONST.TOKEN.LOCATION.HEADER];

    if (authHeader && authHeader.split(' ')[0] === 'Bearer'){
      token = authHeader.split(' ')[1];
    } else {
      token = authHeader;
    }

    if (token) {
      jwt.verify(token, app.get(CONST.TOKEN.SECRET.KEY), (err, decoded) => {
        if (err) {
          reject({
            message: DICTIONARY.AUTH.WRONG_TOKEN,
            success: false
          });
        } else {
          resolve({
            data: decoded,
            success: true,
            user: decoded._doc
          });
        }
      });

    } else {
      reject({
        message: DICTIONARY.AUTH.NO_TOKEN,
        success: false
      });
    }

  });
};