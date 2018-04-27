const express = require("express");
const mongoose = require('mongoose');

const User = require('./models/userModel');
const routes = require('./routes/userRoutes');

const bodyParser = require('body-parser');

const app = express()

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/UserDB');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

routes(app);

app.get((req, res) => res.send("Done"));

app.listen(3000, () => console.log("Listening to 3000!"))