const Clan = require('../models/Clan');
const CustomError = require('../helpers/error/CustomError');
const asyncErrorWrapper = require('express-async-handler');

const addClan = asyncErrorWrapper(async (req, res, next) => {
    const {
        name,
        image, } = req.body;
    const clan = await Clan.create({
        name,
        image,
    });
    res.status(200).json({
        success: true,
        data: clan
    });
});
const getAllClans = asyncErrorWrapper(async (req, res, next) => {
    const clan = await Clan.find();
    return res.status(200).json({
        success: true,
        data: clan
    });
});
const updateClan = asyncErrorWrapper(async (req, res, next) => {
    const { id } = req.params;
    const { name, image } = req.body;
    let clan = await Clan.findById(id);
    clan.name = name;
    clan.image = image;
    clan = await clan.save();
    res.status(200).json({
        success: true,
        data: clan,
        message: `${name} clan changed`,

    });
});
const deleteClan = asyncErrorWrapper(async (req, res, next) => {
    const { id } = req.params;
    await Clan.findByIdAndDelete(id);
    res.status(200).json({
        success: true,
        data: "deleted"
    });
});


module.exports = {
    addClan,
    getAllClans,
    updateClan,
    deleteClan
}