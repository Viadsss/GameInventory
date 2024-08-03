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

module.exports = { getGames };
