CREATE TABLE service_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    sort_order INT NOT NULL DEFAULT 0
);