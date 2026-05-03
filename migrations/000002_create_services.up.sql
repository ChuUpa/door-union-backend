CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    category_id INT NOT NULL REFERENCES service_categories(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    price INTEGER NOT NULL,
    is_hit BOOLEAN NOT NULL DEFAULT FALSE,
    sort_order INT NOT NULL DEFAULT 0
);