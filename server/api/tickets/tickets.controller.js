'use strict';

const app = require('../../app');
const path = require('path');
const Kiwi = require('kiwi-api').default;
const KiwiAPI= new Kiwi();
const User = require('../../models/user.model.js');

exports.getAvailableTickets = (req, res) => {
  KiwiAPI.flights({
    limit: 10
  })
    .then(places => {
      res.render(
        path.join(app.get('views'), 'tickets.list.ejs'),
        {
          auth:req.auth,
          success: true,
          tickets: places.data
        }
        );
    })
    .catch(error => {
      res.status(500).send(error)
    });
};

exports.addUserTicket = (req, res) => {
  return User.findById(req.auth.user._id)
    .then((modelInstance, err) => {
      if (err) throw err;

      //todo implement only unique tickets and filter already added in response
      if (modelInstance.tickets) {
        modelInstance.tickets.push(req.body)
      } else {
        modelInstance.tickets = [req.body];
      }

      return modelInstance.save();
    })
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `Success! Ticket #${req.body.id} was bought.`,
        response: result
      });
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};

exports.getUserTickets = (req, res) => {
  return User.findById(req.auth.user._id)
    .then((user, err) => {
      if (err) throw err;

      res.render(
        path.join(app.get('views'), 'tickets.user.ejs'),
        {
          auth:req.auth,
          success: true,
          tickets: user.tickets
        }
      );
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};