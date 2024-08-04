const pool = require("./pool");

async function getGames() {
  const { rows } = await pool.query(
    `SELECT 
      games.*, 
      genres.name AS genre_name,
      developers.name AS developer_name,
      developers.founded_date AS developer_founded_date
    FROM games
    JOIN genres ON games.genre_id = genres.id
    JOIN developers ON games.developer_id = developers.id`
  );
  return rows;
}

async function getGenres() {
  const { rows } = await pool.query("SELECT * FROM genres");
  return rows;
}

async function getDevelopers() {
  const { rows } = await pool.query("SELECT * FROM developers");
  return rows;
}

async function insertGame(
  title,
  description,
  price,
  release_date,
  genre_id,
  developer_id
) {
  await pool.query(
    `INSERT INTO games (title, description, price, release_date, genre_id, developer_id)
      VALUES ($1, $2, $3, $4, $5, $6)`,
    [title, description, price, release_date, genre_id, developer_id]
  );
}

async function insertGenre(name) {
  await pool.query("INSERT INTO genres (name) VALUES ($1)", [name]);
}

async function insertDeveloper(name, founded_date) {
  await pool.query(
    "INSERT INTO developers (name, founded_date) VALUES ($1, $2)",
    [name, founded_date]
  );
}

module.exports = {
  getGames,
  getGenres,
  getDevelopers,
  insertGame,
  insertGenre,
  insertDeveloper,
};
