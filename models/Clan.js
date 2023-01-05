const mongoose = require('mongoose');
const User = require('./User');
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
ClanSchema.post("save", async function () {
    const user = await User.findById(this.managers[0]);
    user.clan = this._id;
    await user.save();
});
ClanSchema.post("remove", async function () {
    await User.updateMany({
        clan: this._id
    }, 
    { "$set": { "clan": undefined } });
});
module.exports = mongoose.model("Clan", ClanSchema);