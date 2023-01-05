const express = require("express");
const { create, getAll ,update,remove} = require("../controllers/item");
const router = express.Router();


router.post("/create",create);
router.get("/",getAll);
router.put("/:id/update",update);
router.delete("/:id/remove",remove);

module.exports = router;