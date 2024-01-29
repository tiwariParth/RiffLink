// src/controllers/musicLibraryController.js

const User = require('../models/User');
const Album = require('../models/Album');

const getUserMusicLibrary = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate('musicLibrary');
    res.status(200).json(user.musicLibrary);
  } catch (error) {
    console.error('Error fetching user music library:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const addAlbumToLibrary = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { title, artist, year, genre, tracks } = req.body;

    // Create an album
    const album = new Album({ title, artist, year, genre, tracks });

    // Save the album to the database
    await album.save();

    // Add the album to the user's music library
    const user = await User.findById(userId);
    user.musicLibrary.push(album);
    await user.save();

    res.status(201).json({ message: 'Album added to library successfully' });
  } catch (error) {
    console.error('Error adding album to library:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const removeAlbumFromLibrary = async (req, res) => {
  try {
    const userId = req.params.userId;
    const albumId = req.params.albumId;

    // Remove the album from the user's music library
    const user = await User.findByIdAndUpdate(userId, {
      $pull: { musicLibrary: albumId },
    });

    // Delete the album from the database
    await Album.findByIdAndDelete(albumId);

    res.status(200).json({ message: 'Album removed from library successfully' });
  } catch (error) {
    console.error('Error removing album from library:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getUserMusicLibrary, addAlbumToLibrary, removeAlbumFromLibrary };
