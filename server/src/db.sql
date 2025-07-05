DROP TABLE IF EXISTS users;

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(20),
    email VARCHAR(50),
    password VARCHAR(60) NOT NULL
);