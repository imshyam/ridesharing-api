'use strict';

module.exports = function(app) {
    var users = require('../controllers/userController');

    app.route('signup/:fullname/:username/:email/:password')
        .post(users.try_signup);

    app.route('/user/:userId/:password')
        .put(users.try_signin);

    app.route('/logout/:username/:sid')
        .put(users.try_signout);

}