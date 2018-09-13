module.exports = {
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
  getLessons: (req, res) => {
    req.app
      .get("db")
      .getAllLessons()
      .then(lessons => {
        res.status(200).send(lessons);
      });
  },
  makeQuiz: (req, res) => {
    var { lesson, testMode, tokens, description } = req.body.sending;
    req.app
      .get("db")
      .insertNewQuiz([lesson, testMode, description])
      .then(quiz => {
        var num = 0;
        tokens.map((token, i) => {
          req.app
            .get("db")
            .insertTokens([
              quiz[0].id,
              token.order,
              token.tokenType,
              token.value,
              token.testable,
              token.connector
            ])
            .then(res => {
              num++;
            });
        });
        res.sendStatus(200);
      });
  },
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
                  testMode: quizzes[i].testMode,
                  instructions: quizzes[i].instructions,
                  tokens: tokens
                });
              });
          }
          res.status(200).send(layout);
        }
        allTheQuizTokens();
      });

    // var goodLessonLayout = []
    // req.app.get("db").getLesson(id).then(lesson => {
    //     req.app.get("db").getParts(id).then(parts => {
    //         async function crazyStuff(){
    //             for(var i = 0; i<parts.length; i++){
    //                 await req.app.get("db").getTokens(i + 1, id).then(tokens => {
    //                     goodLessonLayout.push({
    //                         title: parts[i].title,
    //                         description: parts[i].description,
    //                         testMode: parts[i].testmode,
    //                         tokens: tokens
    //                     })
    //                 })
    //             }
    //             res.status(200).send(goodLessonLayout)
    //         }
    //         crazyStuff()
    //     })
    // })
  }
};
