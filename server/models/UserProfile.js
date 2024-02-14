const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  bio: {
    type: String,
    default: "",
  },
  profilePicture: {
    type: String,
    default: "",
  },
  dateOfBirth: {
    type: Date,
    default: null,
  },
  location: {
    type: String,
    default: "",
  },
  socialMedia: {
    twitter: { type: String, default: "" },
    facebook: { type: String, default: "" },
    linkedin: { type: String, default: "" },
  },
  interests: {
    type: [String],
    default: [],
  },
  website: {
    type: String,
    default: "",
  },
  contactInfo: {
    phoneNumber: { type: String, default: "" },
    address: { type: String, default: "" },
  },
  preferences: {
    theme: { type: String, default: "light" },
  },
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const UserProfile = mongoose.model("UserProfile", userProfileSchema);

module.exports = UserProfile;
