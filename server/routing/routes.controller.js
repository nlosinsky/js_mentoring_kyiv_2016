'use strict';

const path = require('path');
const authService = require('../services/authStatus');
const CONST = require('../constants/constants');
const DICTIONARY = require('../constants/dictionary');

exports.isAuthorized = (req, res, next) => {
    authService.auth(req).then(
      (resp) => {
        req.auth = resp;
        next();
      },
      () => {
        res
          .status(CONST.STATUS_CODES.FORBIDDEN.CODE)
          .json({
            success: false,
            message: DICTIONARY.AUTH.WRONG_TOKEN
          });
      }
    );
};