'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rideSchema = new Schema({
    username: {
        type: String,
        required: 'Select A username'
    },
    ride_no: {
        type: String,
        required: 'Not a valid ride number'
    },
    longitude: {
        type: Number,
        required: 'Not a valid longitude'
    },
    latitude: {
        type: Number,
        required: 'Not a valid latitude'
    },
    ride_status: {
        type: String,
        required: 'Not a valid status'
    }
});

module.exports = mongoose.model('RideStatus', rideSchema);