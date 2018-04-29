'use strict';

module.exports = function(app) {
    var ride = require('../controllers/rideController');

    app.route('/req_ride')
        .post(ride.request_ride);

    app.route('/accept_ride')
        .put(ride.accept_ride);
}