const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: {
        type: String,
        required: [true, "please provide a name"]
    },
    image: {
        type: String,
        default: "default.jpg"
    },
    info: {
        type: String
    }
});


module.exports = mongoose.model("Item", ItemSchema);