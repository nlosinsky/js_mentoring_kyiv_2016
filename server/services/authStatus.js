'use strict';

const jwt = require('jsonwebtoken');
const app = require('./../app');
const Promise = require('promise');

exports.auth = (req) => {
  return new Promise((resolve) => {

    // check header or url parameters or post parameters for token
    let token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.accessToken;

    if (token) {
      jwt.verify(token, app.get('superSecret'), (err, decoded) => {
        if (err) {
          resolve({
              message: 'Failed to authenticate token.',
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
          message: 'You are not authorized. No token provided.',
          success: false
      });
    }

  });
};