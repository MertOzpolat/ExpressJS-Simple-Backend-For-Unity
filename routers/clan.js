const express = require("express");
const { create, getAll, update, remove } = require("../controllers/clan");
const { getAccessToRoute } = require('../middlewares/authorization/auth');
const { checkClanPermission, checkClanExists } = require("../middlewares/clan/clanCheck");
const router = express.Router();


router.post("/create", [getAccessToRoute, checkClanPermission], create);
router.put("/:id/update", getAccessToRoute, update);
router.delete("/:id/remove", [getAccessToRoute, checkClanExists], remove);
router.get("/", getAll);

module.exports = router;