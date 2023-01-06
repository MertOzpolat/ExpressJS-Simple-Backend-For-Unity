const express = require("express");
const { create, getAll, update, remove, addManager } = require("../controllers/clan");
const { getAccessToRoute } = require('../middlewares/authorization/auth');
const { checkClanPermission, checkClanExists, isClanMember } = require("../middlewares/clan/clanCheck");
const router = express.Router();


router.post("/create", [getAccessToRoute, checkClanPermission], create);
router.put("/:id/update", getAccessToRoute, update);
router.delete("/:id/remove", [getAccessToRoute, checkClanExists], remove);
router.get("/:id/addmanager", [getAccessToRoute, isClanMember], addManager)
router.get("/", getAll);

module.exports = router;