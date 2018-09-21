var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var massive = require("massive");
require('dotenv').config();

var app = express();
app.use(bodyParser.json());

var ctrl = require("./controller.js")

var {SESSION_SECRET, SERVER_PORT, CONNECTION_STRING} = process.env

//app.use(express.static(`__dirname/build`));

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

//These are hit in the lessons
app.get("/api/lessons", ctrl.getLessons);
app.get("/api/parts/:id", ctrl.getParts);

//This is hit in the quiz
app.get("/api/quiz/:id", ctrl.getQuiz);

// This is hit on the createLesson page. This is for a form I made to put quizzes into the database easily.
app.post("/api/newQuiz", ctrl.makeQuiz);


massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    app.listen(SERVER_PORT, console.log(`Zombies to fight on port ${SERVER_PORT}`));
}).catch(err => {
    console.log(err)
})