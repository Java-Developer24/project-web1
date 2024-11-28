// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// Use JSON and CORS middleware
app.use(express.json());
app.use(cors());

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, "public")));

// MongoDB connection setup (if using MongoDB)
mongoose.connect("mongodb+srv://balu:balu@cluster0.1pebo.mongodb.net/guides_db", { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log("Error connecting to MongoDB:", error));

// API routes for handling guides data
const guideSchema = new mongoose.Schema({
  id: Number,
  name: String,
  tickets: [Number],
});
const Guide = mongoose.model("Guide", guideSchema);

// POST route to store guides data
app.post("/api/guides", async (req, res) => {
  try {
    const guidesData = req.body.guides;
    if (!guidesData || !Array.isArray(guidesData)) {
      return res.status(400).json({ error: "Invalid guides data" });
    }
    await Guide.insertMany(guidesData);
    res.status(201).json({ message: "Guides data saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save data" });
  }
});

// GET route to fetch guides data
app.get("/api/guides", async (req, res) => {
  try {
    const guidesData = await Guide.find();
    res.status(200).json({ guides: guidesData });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// Serve index.html when accessing the root URL
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Default route for other requests (404 error)
app.all("*", (req, res) => {
  res.status(404).send("Page Not Found");
});

// Start the server (Vercel handles the port assignment)
module.exports = app;
