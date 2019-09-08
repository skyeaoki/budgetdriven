require("dotenv").config();
const express = require("express");
const fs = require('fs');
const path = require('path');
const https = require('https');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");

const authRouter = require("./routes/auth");
const purchasesRouter = require("./routes/purchases");
const budgetRouter = require("./routes/budget");

const app = express();

// Body parsing middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
    .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

// Cookie Session set up
let sess = {
    resave: false,
    saveUninitialized: true,
    cookie: {}
};

// Cookie Sesion: Secure in production
if(process.env.NODE_ENV === "production") {
    app.use(cookieSession({
        name: "session",
        secret: process.env.SESSION_SECRET, 
        maxAge:  30 * 60 * 1000, // 30 minutes in milliseconds
        secure: true
    }));
} else {
    // Unsecured in development
    app.use(cookieSession({
        name: "session",
        secret: process.env.SESSION_SECRET, 
        maxAge:  30 * 60 * 1000, // 30 minutes in milliseconds
        secure: false
    }));
}

// Serve static files from React
app.use(express.static(path.join(__dirname, 'client/build')));

// Routers
app.use("/api/auth", authRouter);
app.use("/api/purchases", purchasesRouter);
app.use("/api/budget", budgetRouter);

// Error handler
app.use(function(err, req, res, next) {
    let errors = [];

    // Mongoose validation errors
    if(err.name === "ValidationError") {
        let validationErrors = Object.keys(err.errors);
        // Push each error message to array
        validationErrors.forEach( errorName => {
          errors.push(err.errors[errorName].message);
        });  
        // Send error array
        res.status(500).send(errors);
    }  else {
        // Log all other errors to console
        console.error("Error: ", err.status, err.message || err);
        // Send error status
        res.sendStatus( err.status || 500 );
    }
});
  
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));

module.exports = app;