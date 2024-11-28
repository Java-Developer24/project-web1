// /models/Guide.models.js
import mongoose from 'mongoose';

const guideSchema = new mongoose.Schema({
  guideID: { type: String, required: true },
  guideName: { type: String, required: true },
  tickets: { type: Number, default: 0 },
});

const Guide = mongoose.models.Guide || mongoose.model('Guide', guideSchema);
export default Guide;
