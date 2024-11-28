// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const guidesRoutes = require("./routes/guides");

const app = express();

// Use CORS and JSON parsing middleware
app.use(express.json());
app.use(cors());

// Serve static files from the 'public' folder
express.static(path.join(__dirname, 'public'))

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || "mongodb+srv://balu:balu@cluster0.1pebo.mongodb.net/guides_db", { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log("Error connecting to MongoDB:", error));

// Serve index.html when the root URL is accessed
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Use the guides routes for all API requests
app.use("/api/guides", guidesRoutes);

// Export the Express app as a handler for Vercel's serverless functions
module.exports = app;
