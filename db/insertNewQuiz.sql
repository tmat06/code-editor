INSERT INTO quiz 
(lesson, testMode, instructions)
VALUES($1, $2, $3)
RETURNING *;