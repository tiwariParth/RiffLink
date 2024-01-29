const mongoose = require("mongoose");
const Track = require("../models/Track");

async function initDB() {
  try {
    // Connect to the database
    await mongoose.connect("mongodb://localhost:27017/rifflink", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Create Track documents
    const track1 = await Track.create({ title: "Track 1", duration: "3:45" });
    const track2 = await Track.create({ title: "Track 2", duration: "4:20" });

    // Log ObjectIds
    console.log("Track 1 ObjectId:", track1._id);
    console.log("Track 2 ObjectId:", track2._id);

    // Disconnect from the database
    await mongoose.disconnect();
  } catch (error) {
    console.error("Error initializing database:", error.message);
  }
}

// Run the initialization script
initDB();
