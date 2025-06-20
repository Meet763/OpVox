import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { convertSpeechToText } from "../utils/speechToText.js";
import { saveTranscriptionToTxt } from "../utils/saveTranscriptionToTxt.js";
import Transcription from "./speechProcesser.model.js";
import { fileURLToPath } from "url";

// initiate audio recording and pass imp data
export const initRecording = (socket, data) => {
  const recordingId = data.rid;
  const recordingStartTime = data.recordingStartTime;

  const dateOnly = new Date(recordingStartTime * 1000)
    .toISOString()
    .split("T")[0];

  // These two lines replace __dirname in ES6 modules
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);  
  const UPLOAD_DIR = path.join(__dirname, "../uploads");  
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  
  const webmPath = path.join(UPLOAD_DIR, `${recordingId}.webm`);

  const writeStream = fs.createWriteStream(webmPath);

  socket.context = {
    recordingId,
    recordingStartTime,
    dateOnly,
    webmPath,
    writeStream,
  };

  //console.log(`[socket:${socket.id}] Started recording: ${webmPath}`);
};

// getting audio chunk from frontend
export const processAudioChunk = (socket, data) => {
  const { writeStream } = socket.context || {};
  if (writeStream) {
    writeStream.write(Buffer.from(data));
  }
};

// process audio file for transcription
export const finalizeTrascription = (socket) => {
  const { writeStream, webmPath, recordingId, recordingStartTime, dateOnly } =
    socket.context;

  writeStream.end( async () => {
    console.log(`[socket:${socket.id}] Recording saved: ${webmPath}`);

    const wavPath = webmPath.replace(".webm", `.wav`);

    exec(
      `ffmpeg -y -i "${webmPath}" -ac 1 -ar 16000 "${wavPath}"`,
      async (error) => {
        if (error) {
          console.log(`FFmpeg error: ${error.message}`);
          return;
        }

        console.log(`Fixed file created at: ${wavPath}`);

        //Correct: await the result
        try {
          const result = await convertSpeechToText(
            wavPath,
            recordingStartTime
          );

          console.log(result.data);

          const audiofileUrl = `http://localhost:3000/api/v1/speechProcesser/audio/${recordingId}.wav`;
          const transcriptfileUrl = `http://localhost:3000/api/v1/speechProcesser/transcripts/${recordingId}.txt`;

          const sentencesWithDates = result.data.sentences.map((s) => ({
            ...s,
            start_utc: new Date(s.start_utc),
            end_utc: new Date(s.end_utc),
          }));

          await Transcription.create({
            rid: recordingId,
            date: dateOnly,
            audiofileUrl: audiofileUrl,
            transcriptfileUrl:transcriptfileUrl,
            text: result.data.text,
            sentences: sentencesWithDates,
          });

          saveTranscriptionToTxt(recordingId, dateOnly, result);

          socket.emit("transcription", result.data); // Optional: send it back to the frontend via WebSocket

        } catch (err) {
          console.error("Error in transcription:", err.message);
        }

        fs.unlink(webmPath, (err) => {
            if (err) console.error("Failed to delete original:", err);
            else console.log(`Original deleted: ${webmPath}`);
        });
      }
    );
  });
};
