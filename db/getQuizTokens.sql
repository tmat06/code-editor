SELECT * FROM quiz_tokens
WHERE quiz_id = $1
ORDER BY token_order;