// models/Guide.js
const mongoose = require("mongoose");

const guideSchema = new mongoose.Schema({
  id: Number,
  name: String,
  tickets: [Number],
});

const Guide = mongoose.model("Guide", guideSchema);

module.exports = Guide;
