const { Router } = require("express");
const router = Router();
const controller = require("../controllers/genresController");

router.get("/", controller.genresGet);
router.get("/new", controller.genresNewGet);
router.post("/new", controller.genreNewPost);

module.exports = router;
