const Item = require('../models/Item');
const CustomError = require('../helpers/error/CustomError');
const asyncErrorWrapper = require('express-async-handler');

const addItem = asyncErrorWrapper(async (req,res,next)  => {
    const {name,image,info} = req.body;
    const item = await Item.create({
        name,
        image,
        info
    });
    res.status(200).json({
        success:true,
        data:item
    });
});
const getAllItems = asyncErrorWrapper(async (req, res, next) => {
    const item = await Item.find();
    return res.status(200).json({
        success: true,
        data: item
    });
});
module.exports = {
    addItem, getAllItems
}