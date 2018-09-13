module.exports = {
    getParts: (req, res) =>{
        var {id} = req.params;
        var goodLessonLayout = []
        req.app.get("db").getLesson(id).then(lesson => {
            req.app.get("db").getParts(id).then(parts => {
                async function crazyStuff(){
                    for(var i = 0; i<parts.length; i++){
                        await req.app.get("db").getTokens(i + 1, id).then(tokens => {
                            goodLessonLayout.push({
                                title: parts[i].title,
                                description: parts[i].description,
                                testMode: parts[i].testmode,
                                tokens: tokens
                            })
                        })
                    }
                    res.status(200).send(goodLessonLayout)
                }
                crazyStuff()
            })
        })
    },
    getLessons: (req, res) => {
        req.app.get("db").getAllLessons().then(lessons => {
            res.status(200).send(lessons)
        })
    },
    makeQuiz: (req, res) => {
        var {lesson, testMode, tokens} = req.body.sending;
        console.log(lesson, testMode, tokens)

        // 1 'Clickable' [ { order: 1,
        //     tokenType: 'VarKeyword',
        //     value: 'var',
        //     testable: true,
        //     connector: 'undefined' } ]

        req.app.get("db").insertNewQuiz([lesson, testMode]).then(quiz => {
            
        })
    }
}