const mongoose = require("mongoose");

const legalNewsSchema = new mongoose.Schema({
  articleId: {
    type: String,
    unique: true, // Ensure IDs are unique
    required: true,
  },
  title: String,
  description: String,
  url: String,
  image: String,
  publishedAt: Date,
  source: {
    id: String,
    name: String,
    url: String,
  },
  tags: [
    {
      type: String,
      enum: ["Corporate", "Criminal", "International", "Privacy"],
    },
  ],
  fetchedAt: {
    type: Date,
    default: Date.now,
    expires: 604800, // 7 days in seconds
  },
});

module.exports = mongoose.model("LegalNews", legalNewsSchema);
