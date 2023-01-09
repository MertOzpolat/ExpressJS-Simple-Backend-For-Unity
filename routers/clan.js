const express = require("express");
const { create, getAll, update, remove, addManager, removeManager ,removeUser,getSingleClan} = require("../controllers/clan");
const { getAccessToRoute } = require('../middlewares/authorization/auth');
const { checkClanPermission, checkClanExists, isClanMember } = require("../middlewares/clan/clanCheck");
const router = express.Router();


router.get("/", getAll);
router.get("/:id",checkClanExists, getSingleClan);
router.post("/create", [getAccessToRoute, checkClanPermission], create);
router.delete("/:id/remove", [getAccessToRoute, checkClanExists], remove);
router.put("/:id/update", getAccessToRoute, update);
router.put("/:id/addmanager", [getAccessToRoute, isClanMember], addManager);
router.put("/:id/removemanager", [getAccessToRoute, isClanMember], removeManager);
router.put("/:id/removeuser", [getAccessToRoute, isClanMember], removeUser);

module.exports = router;