const express = require("express");
const router = express.Router();
const LegalNews = require("../models/LegalNews");

// GET /api/news
router.get("/", async (req, res) => {
  try {
    const tag = req.query.tag;
    const query = tag ? { tags: tag } : {};

    const articles = await LegalNews.find(query)
      .sort({ publishedAt: -1 })
      .limit(10);

    res.json({
      status: "success",
      data: {
        articles,
        count: articles.length,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

module.exports = router;
