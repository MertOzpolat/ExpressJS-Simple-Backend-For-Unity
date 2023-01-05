const express = require("express");
const auth = require("./auth");
const user = require("./user");
const item = require("./item");
const clan = require("./clan");
const router = express.Router();


router.use("/auth", auth);
router.use("/users", user);
router.use("/item", item);
router.use("/clan", clan);

module.exports = router;