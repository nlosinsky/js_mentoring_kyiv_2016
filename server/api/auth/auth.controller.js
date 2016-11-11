'use strict';

const CONST = require('../../constants/constants');
const DICTIONARY = require('../../constants/dictionary');

const User = require('../../models/user.model.js');
const jwt = require('jsonwebtoken');      //TODO rewrite using passport-jwt
const app = require('../../app');
const authService = require('../../services/authStatus');

exports.performLogin = (req, res) => {
  return User.findOne({
    username: req.body.username
  }).then((user, err) => {
    if (err) {
      throw err;
    }

    if (!user) {
      res
        .status(CONST.STATUS_CODES.NOT_FOUND.CODE)
        .json({
          success: false,
          message: DICTIONARY.AUTH.USER_NOT_FOUND
        });

    } else {

      user.comparePassword(req.body.password, (err, isMatch) => {

        if (err) {
          throw err;
        }

        if (isMatch) {
          let token = jwt.sign(user, app.get(CONST.TOKEN.SECRET.KEY), {
            expiresIn: CONST.TIMING.AUTH_TOKEN_EXPIRATION
          });

          res
            .status(CONST.STATUS_CODES.OK.CODE)
            .json({
              success: true,
              message: DICTIONARY.AUTH.SUCCESS,
              token
            });
        } else {
          res
            .status(CONST.STATUS_CODES.FORBIDDEN.CODE)
            .json({
              success: false,
              message: DICTIONARY.AUTH.WRONG_PASSWORD
            });
        }

      });
    }

  }).catch((err) => {
    res
      .status(CONST.STATUS_CODES.SERVER_ERROR.CODE)
      .json({
        success: false,
        message: err,
      });
  });
};

exports.performSignup = (req, res) => {
  req.body.admin = Boolean(req.body.admin && req.body.admin === 'true');

  if (!req.body.username || !req.body.password) {
    res
      .status(CONST.STATUS_CODES.FORBIDDEN.CODE)
      .json({
        success: false,
        message: DICTIONARY.AUTH.REQUIRED_USERNAME_PASSWORD
      });

  } else {
    return new User(req.body)
      .save()
      .then((user, err) => {
        if (err) {
          throw err;
        }

        let token = jwt.sign(user, app.get(CONST.TOKEN.SECRET.KEY), {
          expiresIn: CONST.TIMING.AUTH_TOKEN_EXPIRATION
        });

        res
          .status(CONST.STATUS_CODES.OK.CODE)
          .json({
            success: true,
            token
          });
      })
      .catch((err) => {
        res
          .status(CONST.STATUS_CODES.SERVER_ERROR.CODE)
          .send(err);
      });
  }
};

exports.isTokenValid = (req, res) => {
  return authService.auth(req).then(
    () => {
      res
        .status(CONST.STATUS_CODES.OK.CODE)
        .json({
          success: true,
          message: DICTIONARY.AUTH.SUCCESS
        });
    },
    () => {
      res
        .status(CONST.STATUS_CODES.FORBIDDEN.CODE)
        .json({
          success: false,
          message: DICTIONARY.AUTH.WRONG_TOKEN
        });
    });

};