SELECT * FROM lessons
WHERE lessons.number = $1
ORDER BY number;