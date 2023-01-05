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
const updateItem= asyncErrorWrapper(async (req,res,next)  => {
    const {id} = req.params;
    const {name,image,info} = req.body;
    let item = await Item.findById(id);
    item.name=name;
    item.image=image;
    item.info=info;
    item = await item.save();
    res.status(200).json({
        success:true,
        data:item
    });
});
const deleteItem= asyncErrorWrapper(async (req,res,next)  => {
    const {id} = req.params;
    await Item.findByIdAndDelete(id);
    res.status(200).json({
        success:true,
        data:"deleted"
    });
});
module.exports = {
    addItem, getAllItems,deleteItem,updateItem
}