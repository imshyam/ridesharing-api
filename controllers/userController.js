'use strict';

const mongoose = require('mongoose');

const User = mongoose.model('Users');

exports.try_signup = function(req, res) {
    User.find({username: req.body.username}, function(err, user){
        if(err) {
            res.send(err);
        }
        if(user.length > 0){
            res.send("Username is taken.");
        } else {
            var new_user = new User(req.body);
            new_user.save(function(err, usr) {
                if (err)
                    res.send(err);
                res.json(usr);
            });
        }
    });
};

exports.try_signin = function(req, res) {
    console.log(req.body);
    req.body.session_key = "apple";
    console.log(req.body);
    User.findOneAndUpdate({username: req.params.username, 
               password: req.params.password}, 
                req.body, {new: true},function(err, user){
        if(err)
            res.send("Username or Password Don't Match.");
        res.json(user);
    });
};

exports.try_signout = function(req, res) {
    User.find({'username': req.params.username, 
               'session_key': req.params.session_key}, function(err, user){
        if(err)
            res.send("You are Not Logged In.");
        user.session_key = "EMPTY";
        user.save(function (err, updatedUser) {
            if (err) 
                return "Unable to sign out.";
            res.send(updatedUser);
        });
    });
};