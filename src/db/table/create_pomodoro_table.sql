CREATE TABLE pomodoro (
    id SERIAL PRIMARY KEY,
    duration INTEGER,
    user_id INTEGER REFERENCES "user"(id)
);
