'use strict';

const CONST = require('../../constants/constants');
const DICTIONARY = require('../../constants/dictionary');

const app = require('../../app');
const Kiwi = require('kiwi-api').default;
const KiwiAPI = new Kiwi();
const User = require('../../models/user.model.js');

exports.getAvailableTickets = (req, res) => {
  return KiwiAPI.flights({
    limit: 10
  })
    .then((places) => {

      dateFormatter(places.data, 'dTimeUTC');
      dateFormatter(places.data, 'aTimeUTC');

      res
        .status(CONST.STATUS_CODES.OK.CODE)
        .json({
          success: true,
          tickets: places.data
        });
    })
    .catch((err) => {
      res
        .status(CONST.STATUS_CODES.SERVER_ERROR.CODE)
        .json({
          message: err,
          success: false
        });
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

      res
        .status(CONST.STATUS_CODES.OK.CODE)
        .json({
          success: true,
          tickets: user.tickets
        });
    })
    .catch((err) => {
      res
        .status(CONST.STATUS_CODES.SERVER_ERROR.CODE)
        .json(err);
    });
};


//todo do it on frontend
/**
 *
 * @param {Object} resp
 * @param {String} field
 * @return {Object} ticket
 *
 * @description format date from timestamp to locale datetime
 */
function dateFormatter(resp, field) {
  resp.map((ticket) => {
    let date = new Date(ticket[field] * 1000);

    ticket[field] = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

    return ticket;
  });
}