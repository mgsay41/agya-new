import express from "express";
import mongoose from "mongoose";
import Notification from "../models/Notification.js";

const router = express.Router();

// Create a new notification
router.post("/notifications", async (req, res) => {
  const { userId, content, category } = req.body;

  try {
    const newNotification = new Notification({
      userId: mongoose.Types.ObjectId(userId), // Ensure the userId is an ObjectId
      content,
      category,
    });
    await newNotification.save();
    res.status(201).json(newNotification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all notifications for a user
router.get("/notifications/:userId", async (req, res) => {
  try {
    const notifications = await Notification.find({
      userId: req.params.userId,
    }).sort({ createdAt: -1 }); // Sort by newest notifications first
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mark notification as read
router.put("/notifications/:id/read", async (req, res) => {
  try {
    const updatedNotification = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true } // Return the updated document
    );
    if (!updatedNotification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    res.status(200).json(updatedNotification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a notification
router.delete("/notifications/:id", async (req, res) => {
  try {
    const deletedNotification = await Notification.findByIdAndDelete(
      req.params.id
    );
    if (!deletedNotification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    res.status(204).json({ message: "Notification deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
