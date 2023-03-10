const User = require('../models/User');
const Item = require('../models/Item');
const asyncErrorWrapper = require("express-async-handler");
const { sendJwtToClient } = require('../helpers/authorization/tokenHelpers');
const { validateUserInput, comparePassword } = require('../helpers/input/inputHelpers');
const CustomError = require('../helpers/error/CustomError');
const Clan = require('../models/Clan');

const register = asyncErrorWrapper(async (req, res, next) => {
    const { name, email, password, role } = req.body;
    const user = await User.create({
        name, email, password, role
    });
    sendJwtToClient(user, res);
});
const login = asyncErrorWrapper(async (req, res, next) => {
    const { email, password } = req.body;
    if (!validateUserInput(email, password)) {
        return next(new CustomError("please check your inputs", 400))
    }
    const user = await User.findOne({ email }).select("+password");
    if (!comparePassword(password, user.password)) {
        return next(new CustomError("please check your credentials", 400))
    }
    sendJwtToClient(user, res);
});
const logout = asyncErrorWrapper(async (req, res, next) => {
    const { NODE_ENV } = process.env;
    return res.status(200).cookie({
        httpOnly: true,
        expires: new Date(Date.now()),
        secure: NODE_ENV === "development" ? false : true
    }).json({
        success: true,
        message: "logout successfull"
    });
});
const imageUpload = asyncErrorWrapper(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.user.id, {
        "profile_image": req.savedProfileImage
    },
        {
            new: true,
            runValidators: true
        });
    res.status(200)
        .json({
            success: true,
            message: user
        });
});
const getFriends = asyncErrorWrapper(async (req, res, next) => {
    const user = await User.findById(req.user.id).populate('friends');
    const friends = user.friends
    res.status(200)
        .json(
            friends);
});
const getItems = asyncErrorWrapper(async (req, res, next) => {
    const user = await User.findById(req.user.id).populate('inventory');
    const items = user.inventory
    res.status(200)
        .json(
            items);
});
const forgotPassword = asyncErrorWrapper(async (req, res, next) => {
    const resetEmail = req.body.email;
    const user = await User.findOne({ email: resetEmail }).select("+password");
    if (!user) {
        return next(new CustomError("no user"), 400);
    }
    const resetPasswordToken = user.getResetPasswordTokenFromUser();
    await user.save();
    const resetPasswordUrl = `http://localhost:5000/api/auth/resetpassword?resetPasswordToken=${resetPasswordToken}`;
    const emailTemplate = `
        <h3>Reset Your Password</h3>
        <p> This <a href = '${resetPasswordUrl}' target = '_blank'>link<a/> will spire in 1 hour</p>
    `;
    const nodemailer = require('nodemailer');
    const { SMTP_USER, SMTP_PASS } = process.env;
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: SMTP_USER,
            pass: SMTP_PASS
        }
    });
    let mailOptions = {
        from: SMTP_USER,
        to: resetEmail,
        subject: 'test',
        html: emailTemplate
    };
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("success");
        }
    });
    res.json({
        success: true,
        message: "Token Sent To Your Email"
    });
});
const resetPassword = asyncErrorWrapper(async (req, res, next) => {
    const { resetPasswordToken } = req.query;
    const { password } = req.body;
    if (!resetPasswordToken) {
        return next(new CustomError("Please proive a valid token", 400));
    }
    let user = await User.findOne({
        resetPasswordToken: resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    });
    if (!user) {
        return next(new CustomError("user not found", 404));
    }
    user.password = password;
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;
    await user.save();
    return res.status(200).json({
        success: true,
        message: "reset pass successfull"
    });
});
const editDetails = asyncErrorWrapper(async (req, res, next) => {
    const editInformation = req.body;
    const user = await User.findByIdAndUpdate(req.user.id, editInformation, {
        new: true,
        runValidators: true
    });
    return res.status(200).json({
        success: true,
        user: user
    });
});
const joinClan = asyncErrorWrapper(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.user.id, { clan: req.clan.id }, {
        new: true,
        runValidators: true
    });
    return res.status(200).json({
        success: true,
        message: user
    });
});
const exitClan = asyncErrorWrapper(async (req, res, next) => {
    const user = await User.findById(req.user.id);


    if (user.clan === "") {
        return next(new CustomError("You have not a clan like this"));
    }
    user.clan = undefined;
    await user.save();

    return res.status(200).json({
        success: true,
        message: "Exit clan"
    });
});
const addFriend = asyncErrorWrapper(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    user.friends.push(req.params.id);
    await user.save();
    return res.status(200).json({
        success: true,
        message: user
    });
});
const deleteFriend = asyncErrorWrapper(async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(req.user.id);
    const index = user.friends.indexOf(id);

    if (index === -1) {
        return next(new CustomError("You have not a friend like this"));
    }
    user.friends.splice(index, 1);
    await user.save();

    return res.status(200).json({
        success: true,
        message: "Deleted friend"
    });
});
const getUser = (req, res, next) => {
    res.json({
        success: true,
        data: {
            id: req.user.id,
            name: req.user.name
        }
    });
};
const addItem = asyncErrorWrapper(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    const item = await Item.findById(req.params.id);
    user.inventory.push(item);
    await user.save();
    return res.status(200).json({
        success: true,
        message: user
    });
});
const changeBalance = asyncErrorWrapper(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    if(user.balance + req.body.balance <0){
        return next(new CustomError("Balance can not be negative",400));
    }
    user.balance+=req.body.balance;
    await user.save();
    return res.status(200).json({
        success: true,
        message: user
    });
});
const removeItem = asyncErrorWrapper(async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(req.user.id);
    const index = user.inventory.indexOf(id);

    if (index === -1) {
        return next(new CustomError("You have not an item like this"));
    }
    user.inventory.splice(index, 1);
    await user.save();

    return res.status(200).json({
        success: true,
        message: "Deleted item"
    });
});

module.exports = {
    register,
    getUser,
    login,
    logout,
    imageUpload,
    forgotPassword,
    resetPassword,
    editDetails,
    joinClan,
    addFriend,
    deleteFriend,
    addItem,
    removeItem,
    exitClan,
    changeBalance,
    getFriends,
    getItems
}