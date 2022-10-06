const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://test_user:testuser123@cluster0.xemb8vs.mongodb.net"
);

const Post = require("./PostSchema");

//db functions here

module.exports = { Post };
