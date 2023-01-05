const User = require('../../models/User');
const CustomError = require('../../helpers/error/CustomError');
const asyncErrorWrapper = require("express-async-handler");

const checkClanExist = asyncErrorWrapper(async (req, res, next) => {
    const id  = req.user.id;
    const user = await User.findById(id);
    if (user.clan !== undefined) {
        return next(new CustomError("you already have a clan", 400));
    }
    next();
});

module.exports = { checkClanExist };