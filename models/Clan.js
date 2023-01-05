const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClanSchema = new Schema({
    name: {
        type: String,
        required: [true, "please provide a name"]
    },
    managers: {
        type: String,
    },
    users: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        }
    ],
    clan_image: {
        type: String,
        default: "default.jpg"
    },
    clanExperience: {
        type: Number,
        default: 0
    },
    clanLevel: {
        type: Number,
        default: 0
    },
    inventory: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Item"
        }
    ]
});

module.exports = mongoose.model("Clan", ClanSchema);