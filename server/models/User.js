// src/models/User.js

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  userEmail: { type: String, required: true },
  password: { type: String, required: true },
  musicLibrary: [{ type: mongoose.Schema.Types.ObjectId, ref: "Album" }],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
