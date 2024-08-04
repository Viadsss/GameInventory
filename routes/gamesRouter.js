const { Router } = require("express");
const router = Router();
const controller = require("../controllers/gamesController");

router.get("/new", controller.gamesNewGet);
router.post("/new", controller.gamesNewPost);

module.exports = router;
