require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const newsRoutes = require("./routes/news");
const scheduleNewsFetching = require("./scheduler/newsScheduler");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/news", newsRoutes);

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("MONGODB_URI environment variable is not set");
  process.exit(1);
}

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    scheduleNewsFetching();
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
