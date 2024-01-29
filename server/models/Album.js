const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  year: { type: Number },
  genre: { type: String },
  tracks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Track" }], // Update reference to "Track"
});

const Album = mongoose.model("Album", albumSchema);

module.exports = Album;
