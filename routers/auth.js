const express = require("express");
const { register, login, getUser, imageUpload,getItems, logout, forgotPassword, resetPassword, editDetails, joinClan, addFriend, deleteFriend, addItem, removeItem, exitClan,changeBalance ,getFriends} = require('../controllers/auth');
const { getAccessToRoute } = require('../middlewares/authorization/auth');
const { checkClanExists, checkClanPermission, hasJoinedClan } = require("../middlewares/clan/clanCheck");
const { checkUserExist } = require("../middlewares/database/databaseErrorHelpers");
const { checkItemExist } = require("../middlewares/item/checkItem");
const profileImageUpload = require('../middlewares/libraries/profileImageUpload');
const router = express.Router();

router.get("/logout", getAccessToRoute, logout);
router.get("/profile", getAccessToRoute, getUser);
router.get("/friends", getAccessToRoute, getFriends);
router.get("/items", getAccessToRoute, getItems);

router.post("/register", register);
router.post("/login", login);
router.post("/forgotpassword", forgotPassword);
router.post("/upload", [getAccessToRoute, profileImageUpload.single('profile_image')], imageUpload);

router.put("/resetpassword", resetPassword);
router.put("/edit", getAccessToRoute, editDetails);
router.put("/:id/joinclan", [getAccessToRoute, checkClanExists, checkClanPermission], joinClan);
router.put("/:id/addfriend", [getAccessToRoute, checkUserExist], addFriend);
router.put("/:id/additem", [getAccessToRoute, checkItemExist], addItem);
router.put("/:id/removeitem", [getAccessToRoute, checkItemExist], removeItem);
router.put("/:id/deletefriend", [getAccessToRoute, checkUserExist], deleteFriend);
router.put("/exitclan", [getAccessToRoute, hasJoinedClan], exitClan);
router.put("/changebalance", getAccessToRoute, changeBalance);

module.exports = router;