const cron = require("node-cron");
const newsController = require("../controllers/newsController");

// Schedule task to run every 30 minutes
const scheduleNewsFetching = () => {
  // Run immediately on startup
  newsController
    .fetchAndStoreLegalNews()
    .then((result) => console.log("Initial fetch completed:", result))
    .catch((err) => console.error("Initial fetch failed:", err));

  // Schedule subsequent runs every 30 minutes
  cron.schedule("*/30 * * * *", async () => {
    console.log("Running scheduled news fetch -", new Date().toISOString());
    try {
      const result = await newsController.fetchAndStoreLegalNews();
      console.log("Scheduled fetch completed:", result);
    } catch (error) {
      console.error("Scheduled fetch failed:", error.message);
    }
  });

  console.log(
    "News fetching scheduler initialized - will run every 30 minutes"
  );
};

module.exports = scheduleNewsFetching;
