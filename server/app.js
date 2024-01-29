// src/app.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const musicLibraryRoutes = require('./routes/musicLibraryRoutes');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/music-library', musicLibraryRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to Rifflink API');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
