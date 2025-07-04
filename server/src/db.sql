CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(20),
    email VARCHAR(50),
    password VARCHAR(50) NOT NULL
);