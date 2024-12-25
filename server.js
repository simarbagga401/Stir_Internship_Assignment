require("dotenv").config();
const express = require("express");
const app = express();
const fetchTwitterPosts = require("./twitterPostLogic");

app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  res.render("index");
});

app.get("/twitter-posts", async (req, res) => {
  const twitterPosts = await fetchTwitterPosts();
  console.log(twitterPosts)
  res.json(twitterPosts);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
