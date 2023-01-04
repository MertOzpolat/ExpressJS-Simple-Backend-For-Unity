const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true
    })
        .then(() => {
            console.log("mongo ok");
        })
        .catch((err) => {
            console.log(err);
        })
}
module.exports = connectDatabase;