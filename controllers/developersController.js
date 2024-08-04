const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const db = require("../db/queries");
const { format } = require("date-fns");

const validateDeveloper = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Developer name is required")
    .isAlpha("en-US", { ignore: " " })
    .withMessage(
      "Developer name can only contain alphabetic characters and spaces"
    )
    .isLength({ max: 30 })
    .withMessage("Developer name has a maximum of 30 characters only"),

  body("founded_date"),
];

exports.developersGet = asyncHandler(async (req, res) => {
  const developers = await db.getDevelopers();
  const formattedDevelopers = developers.map((developer) => ({
    ...developer,
    founded_date: format(new Date(developer.founded_date), "MMMM d, yyyy"),
  }));

  res.render("developers", { developers: formattedDevelopers });
});

exports.developersNewGet = asyncHandler(async (req, res) => {
  res.render("developers/new");
});

exports.developersNewPost = [
  validateDeveloper,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .render("developers/new", { errors: errors.array() });
    }

    const { name, founded_date } = req.body;

    try {
      await db.insertDeveloper(name, founded_date);
      res.redirect("/developers");
    } catch (error) {
      if (error.code === "23505") {
        // Unique Violation
        return res.status(400).render("developers/new", {
          errors: [
            {
              msg: "The developer name already exists",
            },
          ],
        });
      }
      throw error;
    }
  }),
];
