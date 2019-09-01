require('dotenv').config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const authRouter = require("./routes/auth");

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

// Passport middleware
app.use(passport.initialize());

// Passport configuration
require("./config/passport")(passport);

// Serve static files from React
app.use(express.static(path.join(__dirname, 'client/build')));

// Routers
app.use("/api/auth", authRouter);

// Handle any requests that don't match the ones above
app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
