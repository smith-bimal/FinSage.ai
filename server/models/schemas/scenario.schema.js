import mongoose from 'mongoose';

const scenarioSchema = new mongoose.Schema({
  type: { type: String, required: true },
  timeline: { type: Number, required: true },
  details: mongoose.Schema.Types.Mixed
});

export default scenarioSchema;