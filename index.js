const express = require("express");
const mongoose = require('mongoose');

const User = require('./models/userModel');
const Ride = require('./models/rideModel');
const user_routes = require('./routes/userRoutes');
const ride_routes = require('./routes/rideRoute');

const bodyParser = require('body-parser');

const app = express()

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/UserDB');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

user_routes(app);
ride_routes(app);

app.get((req, res) => res.send("Done"));

app.listen(3000, () => console.log("Listening to 3000!"))