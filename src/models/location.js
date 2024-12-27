// models/location.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
    userId: {
        type: String ,  // Use ObjectId here
        ref: 'User',  // Reference to User model
        required: true,
    },
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
