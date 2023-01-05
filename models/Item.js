const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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