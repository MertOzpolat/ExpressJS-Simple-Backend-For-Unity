const express = require("express");
const { addClan, getAllClans, updateClan, deleteClan } = require("../controllers/clan");
const router = express.Router();


router.post("/addclan", addClan);
router.put("/:id/update", updateClan);
router.delete("/:id/delete", deleteClan);
router.get("/", getAllClans);

module.exports = router;