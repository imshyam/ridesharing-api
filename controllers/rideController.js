'use strict';

const mongoose = require('mongoose');
const Ride = mongoose.model('RideStatusModel');
const User = mongoose.model('Users');

const StatusDetail = ["Ride requested", 
                    "Picking up", 
                    "Ride on", 
                    "Dropped"];
function add_new_ride(req, res, driver) {
    var x_source = req.body.x_source;
    var y_source = req.body.y_source;
    var x_destination = req.body.x_destination;
    var y_destination = req.body.y_destination;
    var status = 0;
    var new_ride = new Ride();
    new_ride.username = req.body.username;
    new_ride.driver_username = driver;
    new_ride.x_source = x_source;
    new_ride.y_source = y_source;
    new_ride.x_destination = x_destination;
    new_ride.y_destination = y_destination;
    new_ride.ride_status = status;
    new_ride.save(function(err, ride) {
        if (err)
            res.status(401).send(err);
        res.status(200).send({status: StatusDetail[status], rider: ride.username, driver: driver, time: '18 mins'});
    });
}
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
                if(ride && (ride.ride_status == 0 || ride.ride_status == 1 || ride.ride_status == 2)){
                    res.send("Only one ride at a time.");
                } else {
                    var driver = "";
                    // Get Free Driver
                    User.find({is_driver: true}, function(err, user){
                        if(err)
                            res.send(err);
                        var br = false;
                        for(var i in user){
                            driver = user[i].username;
                            Ride.findOne({driver_username: user[i].username}, {}, { sort: { 'updated_at' : -1 } },
                                 function(err, ride){
                                    if(err)
                                        res.send(err);
                                    if(ride == null || ride.ride_status == 3){
                                        add_new_ride(req, res, driver);
                                    } else if(i == user.length - 1) {
                                        res.send("Driver NOT FOUND.");
                                    }
                            });
                        }
                    });
                }
            });
        }
    });
};

function updateRideStatus(req, res, old_status, new_status) {
    User.find({username: req.body.username, 
        session_key: req.body.session_key}, function(err, user){
        if(err) {
            res.send(err);
        }
        if(user.length < 1){
            res.send("Please Signin to accept a ride");
        } else {
            Ride.findOne({driver_username: req.body.username}, {}, { sort: { 'updated_at' : -1 } },
            function(err, ride){
                if(err) {
                    res.send(err);
                }
                if(ride.ride_status == old_status){
                    ride.ride_status = new_status;
                    ride.save(function (err, updatedRide) {
                        if (err) 
                            res.status(401).send(err);
                        res.status(200).send({status: StatusDetail[ride.ride_status], by: ride.username, time: '18 mins'});
                    });
                } else {
                    res.send("Not a valid action or you are not logged in.");
                }
            });
        }
    });
}

// username and session_key, driver's
exports.accept_ride = function(req, res) {
    updateRideStatus(req, res, 0, 1);
};

exports.pick_up_rider = function(req, res) {
    updateRideStatus(req, res, 1, 2);
};

exports.complete_ride = function(req, res) {
    updateRideStatus(req, res, 2, 3);
};

exports.get_ride_status = function(req, res) {
    Ride.findOne({username: req.params.user}, {}, { sort: { 'updated_at' : -1 } },
    function(err, ride){
        if(err) {
            res.send(err);
        }
        res.status(200).send({status: StatusDetail[ride.ride_status], by: ride.username, time: '18 mins'});
    });
};