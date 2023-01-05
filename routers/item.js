const express = require("express");
const { addItem, getAllItems } = require("../controllers/item");
const router = express.Router();


router.post("/additem",addItem);
router.get("/",getAllItems);

module.exports = router;