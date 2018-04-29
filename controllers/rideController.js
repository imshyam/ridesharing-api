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
            Ride.find({username: req.body.username},
                 function(err, ride){
                if(err) {
                    res.send(err);
                }
                if(ride.ride_status != 3){
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