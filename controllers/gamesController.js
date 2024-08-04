const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

const validateGame = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Game name is required")
    .isLength({ max: 30 })
    .withMessage("Game name has a maximum of 30 characters only"),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Game description is required")
    .isLength({ max: 500 })
    .withMessage("Game description has a maximum of 500 characters only"),
  body("price")
    .notEmpty()
    .withMessage("Game price is required")
    .isDecimal({ decimal_digits: "2" })
    .withMessage(
      "Game price must be a numeric value with up to 2 decimal places"
    ),
  body("release_date").notEmpty().withMessage("Release date is required"),
  body("genre_id").notEmpty().withMessage("Genre ID is required"),
  body("developer_id").notEmpty().withMessage("Developer ID is required"),
];

exports.gamesNewGet = asyncHandler(async (req, res) => {
  const genres = await db.getGenres();
  const developers = await db.getDevelopers();
  res.render("games/new", { genres, developers });
});

exports.gamesNewPost = [
  validateGame,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const genres = await db.getGenres();
      const developers = await db.getDevelopers();
      res
        .status(400)
        .render("games/new", { genres, developers, errors: errors.array() });
    }

    const { title, description, price, release_date, genre_id, developer_id } =
      req.body;

    await db.insertGame(
      title,
      description,
      price,
      release_date,
      genre_id,
      developer_id
    );
    res.redirect("/");
  }),
];
