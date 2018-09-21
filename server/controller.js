var _ = require('lodash');

module.exports = {
  // This endpoint grabs all the parts in a specific lesson.
  getParts: (req, res) => {
    var { id } = req.params;
    var goodLessonLayout = [];
    req.app
      .get("db")
      .getLesson(id)
      .then(lesson => {
        req.app
          .get("db")
          .getParts(id)
          .then(parts => {
            async function crazyStuff() {
              for (var i = 0; i < parts.length; i++) {
                await req.app
                  .get("db")
                  .getTokens(i + 1, id)
                  .then(tokens => {
                    goodLessonLayout.push({
                      title: parts[i].title,
                      description: parts[i].description,
                      testMode: parts[i].testmode,
                      tokens: tokens
                    });
                  });
              }
              res.status(200).send(goodLessonLayout);
            }
            crazyStuff();
          });
      });
  },
  // This is the endpoint we hit on the dashboard view. It grabs all the lessons that are in the database.
  getLessons: (req, res) => {
    req.app
      .get("db")
      .getAllLessons()
      .then(lessons => {
        res.status(200).send(lessons);
      });
  },
  // This is the endpoint that is hit when you click submit quiz on the make lesson page.
  makeQuiz: (req, res) => {
    var { lesson, testMode, tokens, description } = req.body.sending;
    req.app
      .get("db")
      .insertNewQuiz([lesson, testMode, description])
      .then(quiz => {
        tokens.map((token, i) => {
          req.app
            .get("db")
            .insertTokens([
              quiz[0].id,
              token.order,
              token.tokenType,
              token.value,
              token.test,
              token.connector
            ])
            .then(res => {
            });
        });
        res.sendStatus(200);
      });
  },
  // This endpoint we hit when we get to the end of the lesson and go to the quiz for that lesson. It grabs a couple quiz questions from the lesson you're on and the lessons before.
  getQuiz: (req, res) => {
    var { id } = req.params;
    var layout = [];
    req.app
      .get("db")
      .getQuizzes(id)
      .then(quizzes => {
        async function allTheQuizTokens() {
          for (var i = 0; i < quizzes.length; i++) {
            await req.app
              .get("db")
              .getQuizTokens(quizzes[i].id)
              .then(tokens => {
                layout.push({
                  lesson: quizzes[i].lesson,
                  testMode: quizzes[i].testmode,
                  description: quizzes[i].instructions,
                  tokens: tokens
                });
              });
          }
          res.status(200).send(_.shuffle(layout));
        }
        allTheQuizTokens();
      });
  }
};
