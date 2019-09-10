const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User").User;
const Purchase = require("../models/Purchase").Purchase;
const router = express.Router();
const moment =require("moment");

// Get all purchases
router.get("/all", (req, res, next) => {
    Purchase
    .find({user: req.session.user})
    .exec( (err, purchases) => {
        if(err) return next(err);
        if(purchases) {
            let thisMonth = moment().format("MMMM");
            // Filter out any purchases that are not from the current month
            let filteredPurchases = purchases.filter( purchase => {
                return purchase.month === thisMonth;
            });
            
            // Send purchases
            return res.send(filteredPurchases);
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
            // Send status 201 and the new purchases" auto generated id
            res.status(201).send(newPurchase._id);
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