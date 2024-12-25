require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");
const twitterDataFetching = require("./script");

const twitterPostSchema = new mongoose.Schema({
  id: { type: String },
  trendingTopics: Array,
  ipAddress: String,
  dateTime: { type: Date },
});

// Connect to MongoDB
mongoose.connect(process.env.DB_URI);

(async function test() {
  console.log("twitterDataFetching result", await twitterDataFetching());
  console.log("db uri", process.env.DB_URI);
})();
