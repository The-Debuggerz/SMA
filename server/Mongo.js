const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(process.env.DB);

const Post = require("./PostSchema");

//db functions here

module.exports = { Post };
