const express = require("express");
const { addItem, getAllItems ,updateItem,deleteItem} = require("../controllers/item");
const router = express.Router();


router.post("/additem",addItem);
router.get("/",getAllItems);
router.put("/:id/update",updateItem);
router.delete("/:id/delete",deleteItem);

module.exports = router;