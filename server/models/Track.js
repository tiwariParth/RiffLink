// src/models/Track.js

const mongoose = require("mongoose");

const trackSchema = new mongoose.Schema({
  title: { type: String, required: true },
  duration: { type: String },
});

const Track = mongoose.model("Track", trackSchema);

module.exports = Track;
