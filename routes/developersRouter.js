const { Router } = require("express");
const router = Router();
const controller = require("../controllers/developersController");

router.get("/", controller.developersGet);
router.get("/new", controller.developersNewGet);
router.post("/new", controller.developersNewPost);

module.exports = router;
