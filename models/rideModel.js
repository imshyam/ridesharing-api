'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rideSchema = new Schema({
    username: {
        type: String,
        required: 'Select A username'
    },
    driver_username: {
        type: String,
        required: 'Not a valid driver'
    },
    x_source: {
        type: String,
        required: 'Not a valid longitude'
    },
    y_source: {
        type: String,
        required: 'Not a valid longitude'
    },
    x_destination: {
        type: String,
        required: 'Not a valid latitude'
    },
    y_destination: {
        type: String,
        required: 'Not a valid latitude'
    },
    /*
    * 0: ride requested
    * 1: picking up
    * 2: ride on
    * 3: dropped
    */
   updated_at: {
        type: Date,
        default: Date.now
    },
    ride_status: {
        type: Number,
        required: 'Not a valid status'
    }
});

module.exports = mongoose.model('RideStatusModel', rideSchema);