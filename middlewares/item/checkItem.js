const User = require('../../models/Item');
const CustomError = require('../../helpers/error/CustomError');
const asyncErrorWrapper = require("express-async-handler");
const Item = require('../../models/Item');

const checkItemExist = asyncErrorWrapper(async (req, res, next) => {
    const { id } = req.params;
    const item = await Item.findById(id);
    if (!item) {
        return next(new CustomError("There is no item with that id", 400));
    }
    next();
});

module.exports = {
    checkItemExist
}