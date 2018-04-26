'use strict';

const mongoose = require('mongoose');

const User = mongoose.model('Users');

exports.try_signup = function(req, res) {
    res.send("SignUp");
};

exports.try_signin = function(req, res) {
    res.send("SignIn");
};

exports.try_signout = function(req, res) {
    res.send("SignOut");
};