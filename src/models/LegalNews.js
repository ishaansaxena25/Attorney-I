const mongoose = require("mongoose");

const legalNewsSchema = new mongoose.Schema({
  articleId: {
    type: String,
    unique: true,
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
      enum: [
        "Corporate",
        "Criminal",
        "International",
        "Privacy",
        "Constitutional",
        "Environmental",
        "Human Rights",
        "Tax",
        "Labor",
      ],
    },
  ],
  fetchedAt: {
    type: Date,
    default: Date.now,
    expires: 604800,
  },
});

module.exports = mongoose.model("LegalNews", legalNewsSchema);
