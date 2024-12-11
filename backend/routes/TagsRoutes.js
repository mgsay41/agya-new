import express from "express";
import Tag from "../models/Tag.js";

const router = express.Router();

// Create a new tag
router.post("/", async (req, res) => {
  const { name, description } = req.body;

  try {
    const existingTag = await Tag.findOne({ name });
    if (existingTag) {
      return res.status(400).json({ message: "Tag already exists" });
    }

    const newTag = new Tag({ name, description });
    await newTag.save();
    res.status(201).json(newTag);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all tags
router.get("/", async (req, res) => {
  try {
    const tags = await Tag.find();
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a tag by ID
router.get("/:id", async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);
    if (!tag) {
      return res.status(404).json({ message: "Tag not found" });
    }
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a tag
router.put("/:id", async (req, res) => {
  const { name, description } = req.body;

  try {
    const updatedTag = await Tag.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );
    if (!updatedTag) {
      return res.status(404).json({ message: "Tag not found" });
    }
    res.status(200).json(updatedTag);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a tag
router.delete("/:id", async (req, res) => {
  try {
    const deletedTag = await Tag.findByIdAndDelete(req.params.id);
    if (!deletedTag) {
      return res.status(404).json({ message: "Tag not found" });
    }
    res.status(204).json({ message: "Tag deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
