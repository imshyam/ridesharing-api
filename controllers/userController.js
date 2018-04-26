'use strict';

const mongoose = require('mongoose');

const User = mongoose.model('Users');

exports.try_signup = function(req, res) {
    User.find({'username': req.params.username}, function(err, user){
        if(err)
            res.send("Username already exists.");
        var user = new User(req.body);
        res.json(user);
    });
};

exports.try_signin = function(req, res) {
    res.params.session_key = "apple";
    User.find({'username': req.params.username, 
               'password': req.params.password}, 
                req.body, {new: true},function(err, user){
        if(err)
            res.send("Username or Password Don't Match.");
        res.json(user);
    });
};

exports.try_signout = function(req, res) {
    User.find({'username': req.params.username, 
               'session_key': req.params.session_key}, 
               req.body, {new: true},function(err, user){
        if(err)
            res.send("You are Not Logged In.");
        res.params.session_key = "EMPTY";
        res.json(user);
    });
};