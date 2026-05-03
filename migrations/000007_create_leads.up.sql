CREATE TABLE leads (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    message TEXT,
    service TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);