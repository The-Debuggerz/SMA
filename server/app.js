const path = require("path");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const { Post, getPosts } = require("./Mongo");

const app = express();

// Helmet helps you secure your Express apps by setting various HTTP headers
app.use(helmet());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/create", (req, res) => {
  console.log("Connected to React");
});

app.get("/posts", (req, res) => {
  Post.find({}).then((data) => {
    console.log(`Sending ${data.length} Post Packets!`);
    res.json(data);
  });
});

module.exports = app;
