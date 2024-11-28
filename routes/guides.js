// api/guides.js
const mongoose = require("mongoose");
const Guide = require("../models/Guides.models"); // Make sure this model is also adjusted for serverless use

// Connect to MongoDB
mongoose.connect("mongodb+srv://your-mongo-db-connection-string", { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});

module.exports = async (req, res) => {
  if (req.method === "POST") {
    try {
      const guidesData = req.body.guides;

      if (!guidesData || !Array.isArray(guidesData)) {
        return res.status(400).json({ error: "Guides data is missing or invalid" });
      }

      await Guide.insertMany(guidesData);
      res.status(201).json({ message: "Guides data saved successfully" });
    } catch (error) {
      console.error("Error saving guides data:", error);
      res.status(500).json({ error: "Failed to save data" });
    }
  } else if (req.method === "GET") {
    try {
      const guidesData = await Guide.find();
      res.status(200).json({ guides: guidesData });
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Failed to fetch data" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
};
