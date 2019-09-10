const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

const PurchaseSchema = new Schema({
    // Set to expire in 32 days
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 2764800 // 32 days in seconds
    },
    _id: {
        type: Schema.ObjectId,
        auto: true,
        required: true
    },
    user: {
        type: Schema.ObjectId,
        required: true
    },
    cost: {
        type: Number,
        required: [true, "Cost is required"],
        min: [0.01, "Cost must be greater than 0"],
        max: [999999, "Cost must not exceed $999,999"]
    },
    location: {
        type: String,
        required: [true, "Location is required"],
        maxlength: [30, "Location must not exceed 30 characters"]
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        maxlength: [45, "Description must not exceed 45 characters"]
    },
    date: {
        type: Date,
        required: [true, "Date is required"]
    },
    formattedDate: {
        type: String,
        required: [true, "Date is invalid"]
    },
    month: {
        type: String,
        default: moment().format('MMMM') 
    }
});

const Purchase = mongoose.model("Purchase", PurchaseSchema);
module.exports.Purchase = Purchase;