'use strict';

const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    fullname: {
        type: String,
        required: 'Please Enter your Full Name.'
    },
    username: {
        type: String,
        required: 'Select A username'
    },
    email: {
        type: String,
        required: 'Please Enter your email-id.'
    },
    password: {
        type: String,
        required: 'Please Enter password.'
    },
    last_login: {
        type: Date,
        default: Date.now
    },
    session_key: {
        type: String
    }
});

module.exports = mongoose.model('Users', userSchema);