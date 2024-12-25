require("dotenv").config();
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const twitterDataFetching = require("./script");

const twitterPostSchema = new mongoose.Schema({
  id: { type: String },
  trendingTopics: Array,
  ipAddress: String,
  dateTime: { type: Date },
});
const TwitterPost = mongoose.model("TwitterPost", twitterPostSchema);

// Connect to MongoDB
mongoose.connect(process.env.DB_URI);

async function fetchTwitterPosts() {
    const twitterData = await twitterDataFetching();
    const savedPost = await TwitterPost.create({
      id: uuidv4(),
      trendingTopics: twitterData.trendingTopics,
      ipAddress: twitterData.ipAddress,
      dateTime: twitterData.dateTime,
    });

    const fetchedPost = await TwitterPost.find();
    return fetchedPost;
};

module.exports = fetchTwitterPosts;
