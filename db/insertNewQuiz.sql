INSERT INTO quiz 
(lesson, testMode)
VALUES($1, $2)
RETURNING *;