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

module.exports = { checkClanPermission, checkClanExists };