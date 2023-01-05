const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClanSchema = new Schema({
    name: {
        type: String,
        required: [true, "please provide a name"]
    },
    managers: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        }
    ],
    users: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        }
    ],
    image: {
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