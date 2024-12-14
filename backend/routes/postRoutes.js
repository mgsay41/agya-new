import express from "express";
import mongoose from "mongoose";
import Post from "../models/Post.js";

const router = express.Router();

// Create a new post
router.post("/", async (req, res) => {
  const { userId, content ,authorName } = req.body;
  try {
    const newPost = new Post({ userId, content , authorName });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
});

// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get post by ID
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get posts by userId and populate user details
router.get("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const posts = await Post.find({ userId }).populate(
      "userId", // Populate the userId field with user details
      "firstname lastname image" // Include firstname, lastname, and image
    );
    if (posts.length === 0) {
      return res
        .status(404)
        .json({ message: "No posts found for this user" });
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Like a post
router.post("/:id/like", async (req, res) => {
  console.log("Received request to like post:", req.params.id); // Log post ID
  const { userId } = req.body;
  console.log("User ID received:", userId); // Log user ID

  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the user has already liked the post
    if (post.likedBy.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You have already liked this post" });
    }

    // Add userId to likedBy and increment likes count
    post.likedBy.push(userId);
    post.likes += 1;
    await post.save();

    res.status(200).json({ message: "Post liked", post });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Dislike a post
router.post("/:id/dislike", async (req, res) => {
  const { userId } = req.body; // Get userId from the request body
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the user has already disliked the post
    if (post.dislikedBy.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You have already disliked this post" });
    }

    // Add userId to dislikedBy and increment dislikes count
    post.dislikedBy.push(userId);
    post.dislikes += 1;
    await post.save();

    res.status(200).json({ message: "Post disliked", post });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Unlike a post
router.post("/:id/unlike", async (req, res) => {
  const { userId } = req.body; // Get userId from the request body
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the user has liked the post
    if (!post.likedBy.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You have not liked this post yet" });
    }

    // Remove userId from likedBy and decrement likes count
    post.likedBy = post.likedBy.filter((id) => id.toString() !== userId);
    post.likes -= 1;
    await post.save();

    res.status(200).json({ message: "Post unliked", post });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Undislike a post
router.post("/:id/undislike", async (req, res) => {
  const { userId } = req.body; // Get userId from the request body
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the user has disliked the post
    if (!post.dislikedBy.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You have not disliked this post yet" });
    }

    // Remove userId from dislikedBy and decrement dislikes count
    post.dislikedBy = post.dislikedBy.filter((id) => id.toString() !== userId);
    post.dislikes -= 1;
    await post.save();

    res.status(200).json({ message: "Post undisliked", post });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update post
router.put("/:id", async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete post
router.delete("/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
