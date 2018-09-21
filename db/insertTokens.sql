INSERT INTO quiz_tokens
(quiz_id, token_order, type, value, test, connected_token)
VALUES($1, $2, $3, $4, $5, $6)
RETURNING *;