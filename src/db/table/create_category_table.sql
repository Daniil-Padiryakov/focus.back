CREATE TABLE category (
    id SERIAL PRIMARY KEY,
    title VARCHAR (255),
    user_id INTEGER REFERENCES "user"(id)
);
