import express  from "express";
import { deleteUser, login, Logout, register , SingleUser, updatedUser } from "../controllers/auth.js";
const router = express.Router();

// Authentication routes
router.post("/register", register);
router.post("/login", login);
router.post("/logout", Logout);

// User management routes
router.get('/:id', SingleUser);
router.delete("/:id", deleteUser);
router.patch('/:id', updatedUser);

export default router;