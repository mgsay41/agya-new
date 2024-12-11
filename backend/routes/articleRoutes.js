import express from "express";
import mongoose from "mongoose";
import Article from "../models/Article.js";

const router = express.Router();

// Create a new article
router.post("/articles", async (req, res) => {
  const { title, content, authorId, tags, references } = req.body;

  // Validate references format
  if (references && !Array.isArray(references)) {
    console.log("jjjjjj")
    return res
      .status(400)
      .json({ error: "References must be an array of objects" });
  }

  if (references) {
    console.log(references)
    for (const reference of references) {
      if (!reference) {
        console.log("aaaaaaaaaaaa")
        return res
          .status(400)
          .json({ error: "Each reference must include a URL" });
      }
    }
  }

  try {
    const newArticle = new Article({
      title,
      content,
      authorId,
      tags,
      references,
    });
    await newArticle.save();
    res.status(201).json(newArticle);
    console.log("success")
  } catch (err) {
    console.log("ppppppppppppppppppppp")
    console.log(err.message)
    res.status(500).json({ error: err.message });
    
  }
});

// Get all articles
router.get("/articles", async (req, res) => {
  try {
    const articles = await Article.find().populate(
      "authorId",
      "firstname lastname"
    );
    res.status(200).json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a specific article by ID
router.get("/articles/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).populate(
      "authorId",
      "firstname lastname"
    );
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.status(200).json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all articles by a specific user
router.get("/articles/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const articles = await Article.find({ authorId: userId }).populate(
      "authorId",
      "firstname lastname"
    );
    if (articles.length === 0) {
      return res
        .status(404)
        .json({ message: "No articles found for this user" });
    }
    res.status(200).json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an article
router.put("/articles/:id", async (req, res) => {
  const { title, content, tags, references } = req.body;
  try {
    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      { title, content, tags, references },
      { new: true }
    );
    if (!updatedArticle) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.status(200).json(updatedArticle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete an article
router.delete("/articles/:id", async (req, res) => {
  try {
    const deletedArticle = await Article.findByIdAndDelete(req.params.id);
    if (!deletedArticle) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.status(204).json({ message: "Article deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Like an article
router.post("/articles/:id/like", async (req, res) => {
  const { userId } = req.body;
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    if (article.likedBy.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You have already liked this article" });
    }

    article.likedBy.push(userId);
    article.likes += 1;
    await article.save();

    res.status(200).json({ message: "Article liked", article });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Dislike an article
router.post("/articles/:id/dislike", async (req, res) => {
  const { userId } = req.body;
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    if (article.dislikedBy.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You have already disliked this article" });
    }

    article.dislikedBy.push(userId);
    article.dislikes += 1;
    await article.save();

    res.status(200).json({ message: "Article disliked", article });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Unlike an article
router.post("/articles/:id/unlike", async (req, res) => {
  const { userId } = req.body;
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    if (!article.likedBy.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You have not liked this article yet" });
    }

    article.likedBy = article.likedBy.filter((id) => id.toString() !== userId);
    article.likes -= 1;
    await article.save();

    res.status(200).json({ message: "Article unliked", article });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Undislike an article
router.post("/articles/:id/undislike", async (req, res) => {
  const { userId } = req.body;
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    if (!article.dislikedBy.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You have not disliked this article yet" });
    }

    article.dislikedBy = article.dislikedBy.filter(
      (id) => id.toString() !== userId
    );
    article.dislikes -= 1;
    await article.save();

    res.status(200).json({ message: "Article undisliked", article });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
