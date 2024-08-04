const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

const validateGenre = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Genre name is required")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("Genre name can only contain alphabetic characters and spaces")
    .isLength({ max: 30 })
    .withMessage("Genre name has a maximum of 30 characters only"),
];

exports.genresGet = asyncHandler(async (req, res) => {
  const genres = await db.getGenres();
  res.render("genres", { genres: genres });
});

exports.genresNewGet = asyncHandler(async (req, res) => {
  res.render("genres/new");
});

exports.genreNewPost = [
  validateGenre,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("genres/new", { errors: errors.array() });
    }

    const { name } = req.body;
    try {
      await db.insertGenre(name);
      res.redirect("/genres");
    } catch (error) {
      if (error.code === "23505") {
        // Unique Violation
        return res.status(400).render("genres/new", {
          errors: [{ msg: "The genre name already exists" }],
        });
      }
      throw error;
    }
  }),
];
