const User = require('../../models/User');
const Clan = require('../../models/Clan');
const CustomError = require('../../helpers/error/CustomError');
const asyncErrorWrapper = require("express-async-handler");

const checkClanPermission = asyncErrorWrapper(async (req, res, next) => {
    const id = req.user.id;
    const user = await User.findById(id);
    if (user.clan !== undefined) {
        return next(new CustomError("you already have a clan", 400));
    }
    next();
});
const checkClanExists = asyncErrorWrapper(async (req, res, next) => {
    const { id } = req.params;

    const clan = await Clan.findById(id);
    if (!clan) {
        return next(new CustomError("There is no such clan with that id", 400));
    }
    req.clan = clan;
    next();
});
const hasJoinedClan = asyncErrorWrapper(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    console.log(user.clan)
    if (user.clan === undefined) {
        return next(new CustomError("You have not already joined a clan"));
    }
    next();
});
const isClanMember = asyncErrorWrapper(async (req, res, next) => {
    const { id } = req.params;
    const userForManager = await User.findById(id);
    const currentUser = await User.findById(req.user.id);
    if (currentUser.clan.toString() != userForManager.clan.toString()) {
        return next(new CustomError("You cant authorize this user.", 400));
    }
    req.clanId = currentUser.clan;
    next();
})

module.exports = { checkClanPermission, checkClanExists, isClanMember, hasJoinedClan };