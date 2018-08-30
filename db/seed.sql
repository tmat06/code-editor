CREATE TABLE lessons (id SERIAL PRIMARY KEY,
                        number INT,
                        topic VARCHAR);


CREATE TABLE parts (id SERIAL PRIMARY KEY,
                    number INT,
                    lessonNumber INT,
                    title VARCHAR,
                    description VARCHAR,
                    testMode VARCHAR);


CREATE TABLE tokens (id SERIAL PRIMARY KEY,
                    number INT,
                    partNumber INT,
                    type VARCHAR,
                    value VARCHAR,
                    test BOOLEAN,
                    prompt VARCHAR, 
                    lessonNumber INT)



INSERT INTO lessons
(number, topic)
VALUES(1, 'Variables');



INSERT INTO parts
(number, lessonnumber, title, description, testMode)
VALUES (1, 1, 'Lesson 1.1', 'We can use the keyword "var" to declare variables, and name that spot in memory. Name the variable greeting below.', 'Fill in');

INSERT INTO parts
(number, lessonnumber, title, description, testMode)
VALUES (2, 1, 'Lesson 1.2', 'Words are represented in memory as a type of data  called "strings". To create a string, we surround a word with quotes. We can also store strings in our variables using the assignment operator (= sign). Store whatever string you want into our greeting variable.', 'Fill in');

INSERT INTO parts
(number, lessonnumber, title, description, testMode)
VALUES (3, 1, 'Lesson 1.3', '', 'Clickable');



INSERT INTO tokens
(number, partnumber, type, value, test, prompt, lessonNumber)
values (1, 1, 'VarKeyword', 'var', false, 'none', 1);

INSERT INTO tokens
(number, partnumber, type, value, test, prompt, lessonNumber)
VALUES (2, 1, 'VarName', 'greeting', true, 'none', 1);

INSERT INTO tokens
(number, partnumber, type, value, test, prompt, lessonNumber)
VALUES (3, 1, 'Operator', ';', false, 'none', 1);

INSERT INTO tokens
(number, partnumber, type, value, test, prompt, lessonNumber)
VALUES(1, 2, 'VarKeyword', 'var', false, 'none', 1);

INSERT INTO tokens
(number, partnumber, type, value, test, prompt, lessonNumber)
VALUES (2, 2, 'VarName', 'greeting', false, 'none', 1);

INSERT INTO tokens
(number, partnumber, type, value, test, prompt, lessonNumber)
VALUES (3, 2, 'Operator', '=', false, 'none', 1);

INSERT INTO tokens
(number, partnumber, type, value, test, prompt, lessonNumber)
VALUES (4, 2, 'String', '', true, 'none', 1);

INSERT INTO tokens
(number, partnumber, type, value, test, prompt, lessonNumber)
VALUES (5, 2, 'Operator', ';', false, 'none', 1);

INSERT INTO tokens
(number, partnumber, type, value, test, prompt, lessonNumber)
VALUES (1, 3, 'VarKeyword', 'var', false, 'none', 1);

INSERT INTO tokens
(number, partnumber, type, value, test, prompt, lessonNumber)
VALUES (2, 3, 'VarName', 'greeting', true, 'Click on the variable the value "hello" is stored in', 1);

INSERT INTO tokens
(number, partnumber, type, value, test, prompt, lessonNumber)
VALUES (3, 3, 'Operator', '=', false, 'none', 1);

INSERT INTO tokens
(number, partnumber, type, value, test, prompt, lessonNumber)
VALUES (4, 3, 'String', 'hello', false, 'none', 1);

INSERT INTO tokens
(number, partnumber, type, value, test, prompt, lessonNumber)
VALUES (5, 3, 'Operator', ';', false, 'none', 1);



----------------------Test Data TAKE OUT LATER--------------------------------
INSERT INTO lessons
(number, topic)
VALUES(2, 'Something Else');


INSERT INTO parts
(number, lessonnumber, title, description, testMode)
VALUES (1, 2, 'Lesson 2.1', 'This is a test to make sure it works', 'Fill in');

INSERT INTO parts
(number, lessonnumber, title, description, testMode)
VALUES (2, 2, 'Lesson 2.2', 'This is the second part on the second lesson', 'Clickable');


INSERT INTO tokens
(number, partnumber, type, value, test, prompt, lessonnumber)
VALUES(1, 1, 'VarKeyword', 'var', false, 'none', 2)

INSERT INTO tokens
(number, partnumber, type, value, test, prompt, lessonNumber)
VALUES (2, 1, 'VarName', 'notGreeting', true, 'none', 2);

INSERT INTO tokens
(number, partnumber, type, value, test, prompt, lessonNumber)
VALUES (3, 1, 'Operator', ';', false, 'none', 2);

INSERT INTO tokens
(number, partnumber, type, value, test, prompt, lessonNumber)
VALUES (1, 2, 'VarKeyword', 'var', false, 'none', 2);

INSERT INTO tokens
(number, partnumber, type, value, test, prompt, lessonNumber)
VALUES (2, 2, 'VarName', 'netGreeting', true, 'This is totally different', 2);

INSERT INTO tokens
(number, partnumber, type, value, test, prompt, lessonNumber)
VALUES (3, 2, 'Operator', '=', false, 'none', 2);

INSERT INTO tokens
(number, partnumber, type, value, test, prompt, lessonNumber)
VALUES (4, 2, 'String', 'not gonna say hello', false, 'none', 2);

INSERT INTO tokens
(number, partnumber, type, value, test, prompt, lessonNumber)
VALUES (5, 2, 'Operator', ';', false, 'none', 2);