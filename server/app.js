const path = require("path");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

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
  console.log("Sending Posts");
  res.json([
    {
      name: "Post 1",
      content: "Hi Debuggers",
      created: {
        day: "Wed",
        month: "Oct",
        date: "5",
        time: "15:44",
      },
    },
    {
      name: "Post 2",
      content: "Debuggers Are OP",
      created: {
        day: "Wed",
        month: "Oct",
        date: "5",
        time: "16:10",
      },
    },
    {
      name: "Post 3",
      content: "Hail TO Debuggers",
      created: {
        day: "Wed",
        month: "Oct",
        date: "5",
        time: "17:11",
      },
    },
  ]);
});

module.exports = app;
