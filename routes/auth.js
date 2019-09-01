const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User").User;
const router = express.Router();

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

// Sign In
router.post('/signIn', (req, res, next) => {
    // Parse the authorization header into the user's credentials
    let email = req.body.email;
    let password = req.body.password;
    
    if(email && password) {
        // Find user by email
        User.findOne({ email }).then(user => {
            // If user is not found return error
            if (!user) {
                return res.status(404).json({ emailnotfound: "Email not found" });
            }
            // Check password
            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                    // Create JWT Payload
                    const payload = {
                        id: user.id,
                        name: user.name
                    };
                    // Sign token
                    jwt.sign(
                        payload,
                        process.env.SECRET_OR_KEY,
                        {
                            expiresIn: 108000 // 1 hour in seconds
                        },
                        (err, token) => {
                            res.json({
                                success: true,
                                token: "Bearer " + token,
                                user: user
                            });
                        }
                    );
                } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });
                }
            });
        });
    }
});

// Log Out
router.get('/logOut', (req, res, next) => {
  
});


module.exports = router;