module.exports = {
    getLesson: (req, res) =>{
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
    }
}