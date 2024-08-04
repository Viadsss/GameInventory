const { Client } = require("pg");

const dbUrl = process.argv[2];

if (!dbUrl) {
  console.error("Please provide the database URL as an argument");
  process.exit(1);
}

const SQL = `
CREATE TABLE IF NOT EXISTS genres (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS developers (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL UNIQUE,
  founded_date DATE
);

CREATE TABLE IF NOT EXISTS games (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price NUMERIC(9, 2),
  release_date DATE NOT NULL,
  genre_id INTEGER REFERENCES genres(id) ON DELETE SET NULL,
  developer_id INTEGER REFERENCES developers(id) ON DELETE SET NULL
);

INSERT INTO genres (name) VALUES
  ('Action'),
  ('Adventure');

INSERT INTO developers (name, founded_date) VALUES
  ('Epic Games', '1991-01-01'),
  ('Naughty Dog', '1984-01-01');

INSERT INTO games (title, description, price, release_date, genre_id, developer_id) VALUES
  ('Fornite', 'An action-packed adventure.', 59.99, '2024-08-01', 1, 1),
  ('The Last Of Us', 'An exciting new adventure.', 149.99, '2024-09-01', 2, 2);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({ connectionString: dbUrl });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
