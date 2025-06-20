import mongoose from "mongoose";
// const mongoose = require("mongoose")

const SentenceSchema = {
  text: String,
  speaker: String,
  start: Number,        // Whisper relative time (seconds)
  end: Number,
  start_utc: Date,      // Calculated real UTC
  end_utc: Date
};

const TranscriptionSchema = new mongoose.Schema({
  rid: { type: String, required: true },
  date: { type: String }, // Like "2025-06-10"
  audiofileUrl: { type: String },
  transcriptfileUrl: { type: String },
  text: { type: String },
  sentences: [SentenceSchema]
});

const Transcription = mongoose.model("Transcription", TranscriptionSchema);
// module.exports = mongoose.model("Transcription", TranscriptionSchema);
export default Transcription;
