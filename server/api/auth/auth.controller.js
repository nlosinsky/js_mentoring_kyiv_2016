'use strict';

const User = require('../../models/user.model.js');
const jwt = require('jsonwebtoken');      //TODO rewrite using passport-jwt
const app = require('../../app');
const path = require('path');

exports.getLoginPage = (req, res) => {
  res.render(path.join(app.get('views'), 'login.ejs'), {auth:req.auth});
};

exports.performLogin = (req, res) => {
  return User.findOne({
    username: req.body.username
  }).then((user, err) => {
    if (err) throw err;

    if (!user) {
      res.status(404).json({ success: false, message: 'Authentication failed. User not found.' });
    } else {
      if (user.password != req.body.password) {
        res.status(403).json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        let token = jwt.sign(user, app.get('superSecret'), {
          expiresIn: 60 * 60 * 24 // expires in 24 hours
        });

        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }
    }

  }).catch((err) => {
    res.status(500).json({
      success: false,
      message: err,
    });
  });
};

exports.getSignupPage = (req, res) => {
  res.render(path.join(app.get('views'), 'signup.ejs'), {auth:req.auth});
};

exports.performSignup = (req, res) => {
  req.body.admin = Boolean(req.body.admin && req.body.admin === 'true');

   if (!req.body.username || !req.body.password) {
     res.status(403).json({
       success:false,
       message: 'User and Password fields are required!'
     });
   } else {
     return new User(req.body).save()
       .then((user, err) => {
       if (err) throw err;

       let token = jwt.sign(user, app.get('superSecret'), {
         expiresIn: 60 * 60 * 4 // expires in 4 hours
       });

       //todo move status codes to separate constants file
       res.status(200).json({
         success:true,
         token: token
       });
     })
       .catch((err) => {
         res.send(err);
       });
   }
};