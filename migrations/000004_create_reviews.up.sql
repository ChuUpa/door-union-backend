CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    author_name VARCHAR(255) NOT NULL,
    author_location VARCHAR(255),
    text TEXT NOT NULL,
    sort_order INT NOT NULL DEFAULT 0
);