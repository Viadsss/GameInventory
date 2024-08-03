const asyncHandler = require("express-async-handler");
const db = require("../db/queries");
const { format } = require("date-fns");

exports.indexGet = asyncHandler(async (req, res) => {
  const games = await db.getGames();
  const formattedGames = games.map((game) => ({
    ...game,
    release_date: format(new Date(game.release_date), "MMMM d, yyyy"),
    developer_founded_date: format(new Date(game.release_date), "MMMM d, yyyy"),
  }));

  res.render("index", { games: formattedGames });
});
