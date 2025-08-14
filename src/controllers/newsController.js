const axios = require("axios");
const LegalNews = require("../models/LegalNews");
const { generateTags } = require("../utils/tagProcessor");

const fetchAndStoreLegalNews = async () => {
  const apiKey = process.env.GNEWS_API_KEY;

  if (!apiKey) {
    throw new Error("GNEWS_API_KEY environment variable not found");
  }

  try {
    const response = await axios.get("https://gnews.io/api/v4/search", {
      params: {
        q: "legal OR judiciary OR court",
        lang: "en",
        country: "in",
        max: 50,
        apikey: apiKey,
      },
    });

    const articles = response.data.articles;
    let newArticles = 0;

    // Process each article
    for (const article of articles) {
      // Check if article already exists using articleId
      const exists = await LegalNews.findOne({ articleId: article.id });

      if (!exists) {
        // Generate tags from title and description
        const tags = generateTags(article.title, article.description);

        const newsItem = new LegalNews({
          articleId: article.id,
          title: article.title,
          description: article.description,
          url: article.url,
          image: article.image,
          publishedAt: new Date(article.publishedAt),
          source: {
            id: article.source.id,
            name: article.source.name,
            url: article.source.url,
          },
          tags: tags,
        });
        await newsItem.save();
        newArticles++;
      }
    }

    console.log(
      `Fetched ${articles.length} articles, ${newArticles} new articles stored`
    );
    return { totalFetched: articles.length, newArticles };
  } catch (error) {
    console.error("Error fetching news:", error.message);
    throw error;
  }
};

module.exports = {
  fetchAndStoreLegalNews,
};
