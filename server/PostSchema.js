const mongoose = require("mongoose");

const { Schema } = mongoose;

const Post = new Schema(
  {
    author: String,
    title: String,
    content: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", Post);
