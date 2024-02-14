// src/controllers/authController.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const zod = require("zod");
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
app.use(express.json());

const UserSignUp = zod.object({
  username: zod.string().min(3),
  userEmail: zod.string().email(),
  password: zod.string().min(3),
});
const registerUser = async (req, res) => {
  try {
    const { success, data } = UserSignUp.safeParse(req.body);
    if (!success) {
      return res.status(411).json({
        msg: "Invalid Credentials",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ userEmail: data.userEmail });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create a new user
    const newUser = new User({
      username: data.username,
      userEmail: data.userEmail,
      password: hashedPassword,
    });

    console.log(newUser);

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const UserSignIn = zod.object({
  email: zod.string().email(),
  password: zod.string().min(3),
});
const loginUser = async (req, res) => {
  try {
    const { email, password } = UserSignIn.safeParse(req.body);

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, userId: user._id });
  } catch (error) {
    console.error("Error logging in user:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { registerUser, loginUser };
