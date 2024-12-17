import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";

// Importing routes
import authRouter from "./routes/auth.js";
import otpRouter from "./routes/otp.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import replyRoutes from "./routes/replyRoutes.js";
import articleRoutes from "./routes/articleRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import TagsRoutes from "./routes/TagsRoutes.js";
import FeaturedRoutes from "./routes/featuredArticleRoute.js";
import cron from "node-cron";
import Article from "./models/Article.js";
import TopArticle from "./models/featuredArticles.js";
const app = express();
cron.schedule("0 0 * * *", async () => {
  try {
    // Find the article with the highest likes
    const topArticle = await TopArticle.findOne().sort({ likes: -1 }).limit(1);

    if (topArticle) {
      console.log("Top Article of the Day:", topArticle);

      // Create a new FeaturedArticle with just the articleID
      const featured = new FeaturedArticle({
        articleID: topArticle._id,
      });

      // Optional: Delete previous featured articles
      await TopArticle.deleteMany({});

      // Save the new featured article
      await featured.save();
      console.log("Top article saved as Featured Article!");
    }
  } catch (error) {
    console.error("Error fetching top article:", error);
  }
});
// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3000", // Add more origins as needed
    ],
  })
);
app.use(morgan("dev")); // Log HTTP requests

// Database Connection
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI; // Ensure this is loaded from .env
    if (!mongoURI) {
      throw new Error("MongoDB URI is missing!");
    }
    await mongoose.connect(mongoURI); // No need for useNewUrlParser or useUnifiedTopology
    console.log("MongoDB connected successfully!");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1);
  }
};

// Connect to the database
connectDB();

// API Routes
app.use("/api/auth", authRouter); // Authentication routes
app.use("/api/otp", otpRouter); // OTP routes
app.use("/api/users", userRoutes); // User-related routes
app.use("/api/posts", postRoutes); // Post-related routes
app.use("/api/comments", commentRoutes); // Comment-related routes
app.use("/api/replies", replyRoutes); // Reply-related routes
app.use("/api/articles", articleRoutes); // Article-related routes
app.use("/api/activities", activityRoutes); // Activity-related routes
app.use("/api/reports", reportRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/tags", TagsRoutes);
app.use("/api/FeaturedArticles", FeaturedRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Start the server
const port = process.env.SERVER_PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app; // Use ES Module export
