'use strict';

const DICTIONARY = require('../constants/dictionary');
const CONST = require('../constants/constants');

const jwt = require('jsonwebtoken');
const app = require('./../app');
const Promise = require('promise');

exports.auth = (req) => {
  return new Promise((resolve) => {

    // check header or url parameters or post parameters for token
    let token = req.body.token || req.query.token || req.headers[CONST.TOKEN.LOCATION.HEADER] || req.cookies[CONST.TOKEN.LOCATION.COOKIE];

    if (token) {
      jwt.verify(token, app.get(CONST.TOKEN.SECRET.KEY), (err, decoded) => {
        if (err) {
          resolve({
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
      resolve({
        message: DICTIONARY.AUTH.NO_TOKEN,
        success: false
      });
    }

  });
};