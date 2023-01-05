const express = require("express");
const dotenv = require("dotenv");
const routers = require("./routers");
const connectDatabase = require('./helpers/database/connectDatabase')
const customErrorHandler = require('./middlewares/errors/customErrorHandler');
const path = require('path');

dotenv.config({
    path: "./config/env/config.env"
});
connectDatabase();
const app = express();
app.use(express.json());
const PORT = process.env.PORT;

app.use("/api", routers)
app.use(customErrorHandler);
app.use(express.static(path.join(__dirname, "public")));
app.listen(PORT, () => {
    console.log("app started on " + process.env.PORT);
})