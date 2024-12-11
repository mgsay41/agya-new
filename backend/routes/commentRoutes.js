import express from "express";
import mongoose from "mongoose";
import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

const router = express.Router();

// Create a new comment
router.post("/:id/comments", async (req, res) => {
  const { userId, content } = req.body; // Get userId and content from the request body
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Create and save the new comment
    const newComment = new Comment({
      postId: post._id,
      userId,
      content,
    });

    await newComment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all comments for a specific post
router.get("/:id/comments", async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.id }).populate(
      "userId",
      "firstname lastname"
    );
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a comment
router.delete("/comments/:id", async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
