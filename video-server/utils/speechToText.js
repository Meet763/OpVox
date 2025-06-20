import FormData from "form-data";
import axios from "axios";
import fs from "fs";

//convert audio file into text with speaker diarization
export const convertSpeechToText = async (audiofile, recordingStartTime) => {
  console.log(
    "Recording Start Time:",
    recordingStartTime,
    typeof recordingStartTime
  );

  const form = new FormData();
  form.append("file", fs.createReadStream(audiofile));
  form.append("startTime", recordingStartTime);

  const response = await axios.post("http://localhost:8000/transcribe", form, {
    headers: form.getHeaders(),
  });

  return response;
};