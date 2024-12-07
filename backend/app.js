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

const app = express();

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
app.use("/api", userRoutes); // User-related routes
app.use("/api", postRoutes); // Post-related routes
app.use("/api", commentRoutes); // Comment-related routes
app.use("/api", replyRoutes); // Reply-related routes
app.use("/api", articleRoutes); // Article-related routes
app.use("/api", activityRoutes); // Activity-related routes
app.use("/api", reportRoutes);
app.use("/api", messageRoutes);
app.use("/api", notificationRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Start the server
const port = process.env.SERVER_PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app; // Use ES Module export
