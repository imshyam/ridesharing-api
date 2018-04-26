const express = require("express");
const mangoose = require('mongoose');

const User = require('./models/userModel');
const routes = require('./routes/userRoutes');

const bodyParser = require('body-parser');

mangoose.Promise = global.Promise;
mangoose.connect('mangodb://localhost/UserDB');

const app= express()

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

routes(app);


app.listen(3000, () => console.log("Listening to 3000!"))