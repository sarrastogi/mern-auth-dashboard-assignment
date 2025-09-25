import express from "express";
import { Router } from "express";
import { User } from "../modals/usermodal.js";
import jwt from "jsonwebtoken";
import { protect } from "../controller/authent.js";

const router = Router();

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SCERET, { expiresIn: "30d" });
};

// Register
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "please fill this field" });
    }

    let existeUser = await User.findOne({ email });
    if (existeUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ username, email, password });
    const token = generateToken(user._id);

    return res.status(201).json({
      id: user._id,
      username: user.username,
      email: user.email,
      token,
    });
  } catch (err) {
    console.error("Error in /register:", err.message);
    return res.status(500).json({ message: "server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "please fill this field" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const validatePass = await user.isPasswordcorrect(password);
    if (!validatePass) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    res.cookie("token", token, { httpOnly: true });
    return res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: error.message });
  }
});



router.get("/me", protect, async (req, res) => {
  return res.status(200).json(req.user);
});

export default router;
