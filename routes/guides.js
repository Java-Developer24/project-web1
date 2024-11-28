// routes/guides.js
const express = require("express");
const Guide = require("../models/Guides.models");
const router = express.Router();

// POST Route to Store Guides Data
router.post("/", async (req, res) => {
  try {
    const guidesData = req.body.guides;

    if (!guidesData || !Array.isArray(guidesData)) {
      return res.status(400).json({ error: "Guides data is missing or invalid" });
    }

    await Guide.insertMany(guidesData);
    res.status(201).json({ message: "Guides data saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save data" });
  }
});

// GET Route to Fetch Guides Data
router.get("/", async (req, res) => {
  try {
    const guidesData = await Guide.find();
    res.status(200).json({ guides: guidesData });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

module.exports = router;
