CREATE TABLE portfolio_items (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    image_path VARCHAR(255) NOT NULL,
    duration VARCHAR(255),
    sort_order INT NOT NULL DEFAULT 0
);