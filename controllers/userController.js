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
    req.body.session_key = "apple";
    User.findOneAndUpdate({username: req.body.username, 
               password: req.body.password}, 
                req.body, {new: true},function(err, user){
        if(err)
            res.send(err);
        if(user.length < 1){
            res.send("Username or password is wrong.");
        }
        res.json(user);
    });
};

exports.try_signout = function(req, res) {
    User.update({username: req.body.username, 
                 session_key: req.body.session_key}, 
                { $set: { session_key: 'EMPTY' }}, 
                function(err, user) {
                    if(err) 
                        res.send(err);
                    if(user.nModified > 0)
                        res.send("Signed Out.")
                    else 
                        res.json("Not logged in.");}
    );
};