require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

// Body parsing middleware
app.use( bodyParser.urlencoded({ extended: false }) );
app.use( bodyParser.json() );

// Database configuration
const dbUri = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose
    .connect(dbUri, { useNewUrlParser: true })
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
