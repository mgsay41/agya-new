import express from "express";
import mongoose from "mongoose";
import Report from "../models/Report.js";

const router = express.Router();

// Create a new report
router.post("/report", async (req, res) => {
  const { userId, content, articleId, postId, commentId } = req.body;

  try {
    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid userId format" });
    }

    // Ensure at least one of articleId, postId, or commentId is provided
    if (!articleId && !postId && !commentId) {
      return res.status(400).json({
        error: "At least one of articleId, postId, or commentId is required",
      });
    }

    // Create a new report
    const newReport = new Report({
      userId: new mongoose.Types.ObjectId(userId),
      content,
      articleId: articleId ? mongoose.Types.ObjectId(articleId) : undefined, // Convert to ObjectId if provided
      postId: postId ? mongoose.Types.ObjectId(postId) : undefined, // Convert to ObjectId if provided
      commentId: commentId ? mongoose.Types.ObjectId(commentId) : undefined, // Convert to ObjectId if provided
    });

    // Save the report
    await newReport.save();
    res.status(201).json(newReport);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Get all reports
router.get("/reports", async (req, res) => {
  try {
    const reports = await Report.find();
    res.status(200).json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a specific report by ID
router.get("/reports/:id", async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }
    res.status(200).json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a report
router.delete("/reports/:id", async (req, res) => {
  try {
    await Report.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: "Report deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
