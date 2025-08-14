const cron = require("node-cron");
const { fetchAndStoreLegalNews } = require("../controllers/newsController");

// Schedule task to run every 30 minutes
const scheduleNewsFetching = () => {
  // Run immediately on startup
  fetchAndStoreLegalNews()
    .then(() => console.log("Initial fetch completed"))
    .catch((err) => console.error("Initial fetch failed:", err));

  // Schedule subsequent runs every 30 minutes
  cron.schedule("*/30 * * * *", async () => {
    console.log("Running scheduled news fetch -", new Date().toISOString());
    try {
      const result = await fetchAndStoreLegalNews();
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
