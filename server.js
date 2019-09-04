require('dotenv').config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");

const authRouter = require("./routes/auth");
const budgetRouter = require("./routes/budget");

const app = express();

// Remove deprecation warning
mongoose.set('useCreateIndex', true);

// Body parsing middleware
app.use( bodyParser.urlencoded({ extended: false }) );
app.use( bodyParser.json() );

// Connect to MongoDB
mongoose
    .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

// Cookie Session set up
let sess = {
  resave: false,
  saveUninitialized: true,
  cookie: {}
}

app.use(cookieSession({
  name: 'session',
  secret: process.env.SESSION_SECRET, 
  maxAge: 3 * 1000 // 3 seconds in milliseconds
}));

// Routers
app.use("/api/auth", authRouter);
app.use("/api/budget", budgetRouter);

// Error handler
app.use(function(err, req, res, next) {
    let mongooseErrors = [];

    // Mongoose validation error
    if(err.name === "ValidationError") {
      let mongooseValidationErrors = Object.keys(err.errors);
      // Push each error message to array
      mongooseValidationErrors.forEach( errorName => {
        mongooseErrors.push(err.errors[errorName].message);
      });  
      // Send error array
      res.send(mongooseErrors);
    }  else {
        // Log all other errors to console
        console.error("Error: ", err.status, err.message || err);
        // Send error status
        res.sendStatus( err.status || 500 );
    }
   
  });
  

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
