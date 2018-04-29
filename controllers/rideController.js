'use strict';

const mongoose = require('mongoose');
const Ride = mongoose.model('RideStatusModel');
const User = mongoose.model('Users');

const StatusDetail = ["Ride requested", 
                    "picking up", 
                    "Ride on", 
                    "Dropped"];

exports.request_ride = function(req, res) {
    User.find({username: req.body.username, 
               session_key: req.body.session_key}, function(err, user){
        if(err) {
            res.send(err);
        }
        if(user.length < 1){
            res.send("Please Signin to book a ride");
        } else {
            Ride.findOne({username: req.body.username}, {}, { sort: { 'updated_at' : -1 } },
                 function(err, ride){
                if(err) {
                    res.send(err);
                }
                if(ride.ride_status == 0 || ride.ride_status == 1 || ride.ride_status == 2){
                    res.send("Only one ride at a time.");
                } else {
                    var x_source = '42.345';
                    var y_source = '74.314';
                    var x_destination = '43.232';
                    var y_destination = '75.392';
                    var ride_no = '5367'
                    var status = 0;
                    var ride_status = StatusDetail[status];
                    var new_ride = new Ride();
                    new_ride.username = req.body.username;
                    new_ride.ride_no = ride_no;
                    new_ride.x_source = x_source;
                    new_ride.y_source = y_source;
                    new_ride.x_destination = x_destination;
                    new_ride.y_destination = y_destination;
                    new_ride.ride_status = status;
                    new_ride.save(function(err, ride) {
                        if (err)
                            res.send(err);
                        res.send({status: ride_status, by: ride.username, time: '18 mins'});
                    });
                }
            });
        }
    });
};

// username and session_key, driver's
exports.accept_ride = function(req, res) {
    User.find({username: req.body.username, 
        session_key: req.body.session_key}, function(err, user){
        if(err) {
            res.send(err);
        }
        if(user.length < 1){
            res.send("Please Signin to accept a ride");
        } else {
            Ride.findOne({ride_no: req.body.username}, {}, { sort: { 'updated_at' : -1 } },
            function(err, ride){
                if(err) {
                    res.send(err);
                }
                console.log(ride);
                if(ride.ride_status == 0){
                    ride.ride_status = 1;
                    ride.save(function (err, updatedRide) {
                        if (err) 
                            res.status(401).send(err);
                        res.status(200).send(updatedRide);
                    });
                } else {
                    res.send("Not a valid action.");
                }
            });
        }
    });
};

exports.pick_up_rider = function(req, res) {

};

exports.complete_ride = function(req, res) {
};

exports.get_ride_status = function(req, res) {
};