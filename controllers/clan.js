const Clan = require('../models/Clan');
const CustomError = require('../helpers/error/CustomError');
const asyncErrorWrapper = require('express-async-handler');

const create = asyncErrorWrapper(async (req, res, next) => {
    const currentUserId = req.user.id;
    const managers = [];
    managers.push(currentUserId);
    const { name, image } = req.body;
    const clan = await Clan.create({
        name,
        image,
        managers
    });
    res.status(200).json({
        success: true,
        data: clan,
        createdBy: currentUserId
    });
});
const getAll = asyncErrorWrapper(async (req, res, next) => {
    const clan = await Clan.find();
    return res.status(200).json({
        success: true,
        data: clan
    });
});
const update = asyncErrorWrapper(async (req, res, next) => {
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
const remove = asyncErrorWrapper(async (req, res, next) => {
    const clan = req.clan;
    await clan.remove();

    res.status(200).json({
        success: true,
        data: clan
    });
});


module.exports = {
    create,
    update,
    remove,
    getAll
}