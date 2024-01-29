// src/routes/musicLibraryRoutes.js

const express = require("express");
const router = express.Router();
const musicLibraryController = require("../controllers/musicLibraryController");

// Get user's music library
router.get("/:userId/library", musicLibraryController.getUserMusicLibrary);

// Add an album to the library
router.post(
  "/:userId/library/addAlbum",
  musicLibraryController.addAlbumToLibrary
);

// Remove an album from the library
router.delete(
  "/:userId/library/removeAlbum/:albumId",
  musicLibraryController.removeAlbumFromLibrary
);

module.exports = router;
