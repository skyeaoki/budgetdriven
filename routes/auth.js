const express = require("express");
const User = require("../models/User").User;
const router = express.Router();

// Sign In
router.post('/signIn', (req, res, next) => {
  // parse the authorization header into the user's credentials
  let email = req.body.email;
  let password = req.body.password;

  if(email && password) {
    // check the credentials against the database
    User.authenticate(email, password, (err, user) => {
      if(err) return next(err);

      // if authentication succeeds assign a session to keep user signed in
      if(user) {
        req.session.user = user._id;
        res.sendStatus(200);
      // otherwise send 401 unauthorzied
      } else {
        res.sendStatus(401);
      }
    });
  }
});

// Sign Up
router.post('/signUp', (req, res, next) => {
  // Create a new user
  let user = new User(req.body);
  user.save((err, user) => {
    if(err) return next(err);

    // If user succesfully created return status 201
    if(user) {
      res.sendStatus('201');
    }
  });
});

// Log Out
router.get('/logOut', (req, res, next) => {
  
});


module.exports = router;