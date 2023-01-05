const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema;
const crypto = require('crypto');

const ItemSchema = new Schema({
    name: {
        type: String,
        required: [true, "please provide a name"]
    },
    profile_image: {
        type: String,
        default: "default.jpg"
    },
    itemInfo: {
        type: String
    }
});



module.exports = mongoose.model("Clan", ItemSchema);
