var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var massive = require("massive");
require('dotenv').config();

var app = express();
app.use(bodyParser.json());

var ctrl = require("./controller.js")

var {SESSION_SECRET, SERVER_PORT, CONNECTION_STRING} = process.env


app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))


app.get("/api/lessons/:id", ctrl.getLesson)

//app.use(express.static(`__dirname/build`));




massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    app.listen(SERVER_PORT, console.log(`Zombies to fight on port ${SERVER_PORT}`));
}).catch(err => {
    console.log(err)
})

//app.listen(SERVER_PORT, console.log(`Zombies to fight on port ${SERVER_PORT}`));