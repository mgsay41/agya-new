import express from "express";
import mongoose from "mongoose"; // Use ES module syntax for mongoose
import User from "../models/User.js"; // Ensure the file extension is included for ES modules

const router = express.Router();

// Create a new user
router.post("/users", async (req, res) => {
  const { email, password, firstname, lastname } = req.body;
  try {
    const newUser = new User({ email, password, firstname, lastname });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user by ID
router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id.trim(); // Clean up any extra spaces or newlines

    // Check if the userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid User ID format" });
    }

    const user = await User.findById(userId); // Find the user by the cleaned-up ID

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user); // Return the user data if found
  } catch (err) {
    res.status(500).json({ message: "Error fetching user", error: err });
  }
});

// Update user
router.put("/users/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete user
router.delete("/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
