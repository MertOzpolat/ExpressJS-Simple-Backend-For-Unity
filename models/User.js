const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema;
const crypto = require('crypto');

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "please provide a name"]
    },
    email: {
        type: String,
        required: [true, "please provide a email"],
        unique: true,
        match: [
            /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/, "please provide a valid email"
        ]
    },
    password: {
        type: String,
        minLenght: [6, "min lenght 6"],
        required: [true, "please provide a pass"],
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    about: {
        type: String
    },
    profile_image: {
        type: String,
        default: "default.jpg"
    },
    blocked: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpire: {
        type: Date
    },
    level: {
        type: Number,
        default: 0
    },
    experience: {
        type: Number,
        default: 0
    },
    clan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clan"
    },
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    balance: {
        type: Number,
        default: 0
    },
    inventory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Item"
        }
    ]
});

UserSchema.methods.generateJwtFromUser = function () {
    const { JWT_SECRET_KEY, JWT_EXPIRE } = process.env;
    const payload = {
        id: this._id,
        name: this.name
    };
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRE });
    return token;
};
UserSchema.methods.getResetPasswordTokenFromUser = function () {
    const randomHexString = crypto.randomBytes(15).toString("hex");
    const { RESET_PASSWORD_EXPIRE } = process.env;
    console.log(randomHexString);
    const resetPasswordToken = crypto
        .createHash('SHA256')
        .update(randomHexString)
        .digest("hex");
    this.resetPasswordToken = resetPasswordToken;
    this.resetPasswordExpire = Date.now() + parseInt(RESET_PASSWORD_EXPIRE);

}

UserSchema.pre("save", function (next) {
    if (!this.isModified("password")) {
        next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) next(err);
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) next(err);
            this.password = hash;
            next();
        });
    });
})
module.exports = mongoose.model("User", UserSchema);