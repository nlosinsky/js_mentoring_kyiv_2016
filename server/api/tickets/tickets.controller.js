'use strict';

const CONST = require('../../constants/constants');
const DICTIONARY = require('../../constants/dictionary');

const app = require('../../app');
const path = require('path');
const Kiwi = require('kiwi-api').default;
const KiwiAPI = new Kiwi();
const User = require('../../models/user.model.js');

exports.getAvailableTickets = (req, res) => {
  KiwiAPI.flights({
    limit: 10
  })
    .then((places) => {
      res.render(
        path.join(app.get('views'), 'tickets.list.ejs'),
        {
          auth: req.auth,
          success: true,
          tickets: places.data
        }
      );
    })
    .catch((err) => {
      res
        .status(CONST.STATUS_CODES.SERVER_ERROR.CODE)
        .send(err);
    });
};

exports.addUserTicket = (req, res) => {
  return User
    .findById(req.auth.user._id)
    .then((modelInstance, err) => {

      if (err) {
        throw err;
      }

      //todo implement only unique tickets and filter already added in response
      if (modelInstance.tickets) {
        modelInstance.tickets.push(req.body)
      } else {
        modelInstance.tickets = [req.body];
      }

      return modelInstance.save();
    })
    .then((response) => {
      res
        .status(CONST.STATUS_CODES.OK.CODE)
        .json({
          success: true,
          message: DICTIONARY.PARAMS.BUYING.TICKET_WAS_BOUGHT(req.body.id),
          response
        });
    })
    .catch((err) => {
      res
        .status(CONST.STATUS_CODES.SERVER_ERROR.CODE)
        .json(err);
    });
};

exports.getUserTickets = (req, res) => {
  return User
    .findById(req.auth.user._id)
    .then((user, err) => {

      if (err) {
        throw err;
      }

      res.render(
        path.join(app.get('views'), 'tickets.user.ejs'),
        {
          auth: req.auth,
          success: true,
          tickets: user.tickets
        }
      );
    })
    .catch((err) => {
      res
        .status(CONST.STATUS_CODES.SERVER_ERROR.CODE)
        .json(err);
    });
};