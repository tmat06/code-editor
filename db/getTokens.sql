SELECT * FROM tokens
WHERE partnumber = $1 AND lessonnumber = $2
ORDER BY number;