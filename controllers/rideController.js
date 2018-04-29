'use strict';

const mongoose = require('mongoose');
const Ride = mongoose.model('RideStatusModel');
const User = mongoose.model('Users');

const StatusDetail = ["Ride requested", 
                    "picking up", 
                    "Ride on", 
                    "Dropped"];

exports.request_ride = function(req, res) {
    Ride.find({username: req.body.username, 
               session_key: req.body.session_key}, function(err, user){
        if(err) {
            res.send(err);
        }
        if(user.length < 1){
            res.send("Please Signin to book a ride");
        } else {
            var x_source = '42.345';
            var y_source = '74.314';
            var x_destination = '43.232';
            var y_destination = '75.392';
            var ride_no = '5367'
            var status = 0;
            var ride_status = StatusDetail[status];
            var new_ride = new Ride();
            ride.username = req.body.username;
            ride.ride_no = ride_no;
            ride.longitude = longitude;
            ride.latitude = latitude;
            ride.ride_status = status;
            new_ride.save(function(err, ride) {
                if (err)
                    res.send(err);
                res.send({status: ride_status, by: ride.username, time: '18 mins'});
            });
        }
    });
};