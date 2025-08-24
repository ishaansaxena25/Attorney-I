const express = require("express");
const router = express.Router();
const newsController = require("../controllers/newsController");

router.get("/", async (req, res) => {
  try {
    const { tag } = req.query;
    const news = await newsController.getNews(tag);
    res.json({
      status: "success",
      data: {
        articles: news,
        count: news.length,
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
