import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";

const router = express.Router();

// Login route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("Received login request:", { username, password });
  try {
    const user = await User.findOne({ username });
    if (!user) {
      console.log("User not found:", username);
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Invalid password for user:", username);
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    console.log("Login successful for user:", username);
    res.json({ success: true, message: "Login successful" });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Registration route
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  console.log("Received registration request:", { username, email, password });
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log("Username already exists:", username);
      return res
        .status(400)
        .json({ success: false, message: "Username already exists" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      console.log("Email already exists:", email);
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    console.log("User created successfully:", username);
    res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
