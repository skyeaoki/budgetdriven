const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User").User;
const Purchase = require("../models/Purchase").Purchase;
const router = express.Router();


// Get all purchases
router.get('/all', (req, res, next) => {
    // Find all dinners for current user and populate them with the recipes
    Purchase
    .find({user: req.session.user})
    .exec( (err, purchases) => {
        if(err) return next(err);
        if(purchases) {
            return res.send(purchases);
        }
    });
});

// Add a new purchase
router.post("/new", (req, res, next) => {
    let purchase = new Purchase(req.body);
    purchase.user = req.session.user;
    purchase.save( (err, newPurchase) => {
        if(err) return next(err);

        if(newPurchase) {
            res.sendStatus(201);
        }
    });
});

// Delete a purchase
router.delete("/", (req, res, next) => {
    Purchase.deleteOne({ _id: req.body.id }, (err) => {
        if(err) {
            return next(err);
        } else {
            res.sendStatus(204);
        }
    });
});

module.exports = router;