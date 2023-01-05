const express = require("express");
const { create, getAll, update, remove } = require("../controllers/clan");
const {getAccessToRoute} = require('../middlewares/authorization/auth');
const { checkClanExist } = require("../middlewares/clan/clanCheck");
const router = express.Router();


router.post("/create",[getAccessToRoute,checkClanExist], create);
router.put("/:id/update",getAccessToRoute, update);
router.delete("/:id/remove",getAccessToRoute, remove);
router.get("/", getAll);

module.exports = router;