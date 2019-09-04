const express = require('express');
const mongoose = require('mongoose');
const User = require("../models/User").User;
const router = express.Router();

// Update budget
router.put('/', (req, res, next) => {
    User.findByIdAndUpdate(req.body.userId, {budget: req.body.budget}, {runValidators: true}, (err, updatedBudget) => {
        if(err) return next (err);
        if(updatedBudget) return res.sendStatus(204);
    });
});

module.exports = router;