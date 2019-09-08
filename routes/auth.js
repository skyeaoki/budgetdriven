const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User").User;
const router = express.Router();


// Check if user is authorized on refresh
router.get("/", (req, res, next) => {
    console.log(req.session);
    if(req.session.user) {
        User.findById(req.session.user)
        .then( user => {
            // Return user document
            return res.status(200).send(user);
        })
        .catch(err => { if(err) console.log(err) });
    } else {
        //return res.sendStatus(401);
    }
});

// Sign Up
router.post("/signUp", (req, res, next) => {
    // First check if user already exists 
    User.findOne({ email: req.body.email })
        .then(user => {
            // If user already exists, return error
            if (user) {
                return res.status(400).send(["Email already exists"]);
            } else {
                // Create a new user
                let user = new User(req.body);
                user.save((err, user) => {
                    if(err) return next(err);
                    // If user succesfully created return status 201
                    if(user) {
                        return res.sendStatus("201");
                    }
                });
            }
        })
        .catch(err => { if(err) console.log(err) });
});

// Sign In
router.post("/signIn", (req, res, next) => {
    console.log("signIn route");
    let email = req.body.email;
    let password = req.body.password;
  
    if(email && password) {
        // Find the user by email
        User.findOne({ email: email }, (err, user) => {
            if(err) return console.log(err);

            // If no user by that email return error
            if(!user) {
                console.log("no user");
                return res.status(404).send(["Email not found"]);
            }

            // Check password
            bcrypt.compare(password, user.password, (error, result) => {
                // If passwords match, return the user document
                if(result === true) {
                    req.session.user = user._id;
                    return res.status(200).send(user);
                } else {
                    // If passwords don't match return error
                    return res.status(400).send(["Incorrect Password"]);
                }
            });
        });
    }
});


// Log Out
router.get("/signOut", (req, res, next) => {
    // Clear session
    req.session.user = false;
    return res.sendStatus(200);
});


module.exports = router;