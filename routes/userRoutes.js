'use strict';

module.exports = function(app) {
    var users = require('../controllers/userController');

    app.route('/signup')
        .post(users.try_signup);

    app.route('/signin')
        .put(users.try_signin);

    app.route('/signout')
        .put(users.try_signout);

}