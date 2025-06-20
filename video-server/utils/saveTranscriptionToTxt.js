import fs from "fs";
import path from "path";

//save transcription in text file or .txt file
export const saveTranscriptionToTxt = (rid, dateOnly, result) => {
  const folderPath = path.join(process.cwd(), "transcripts"); // Root/transcripts
  const filePath = path.join(folderPath, `${rid}.txt`);

  // Ensure transcripts folder exists
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  // Create file content
  let fileContent = `Recording ID: ${rid}\nDate: ${dateOnly}\n\n`;
  fileContent += `Full Transcription:\n${result.data.text}\n\nDetailed Sentences:\n`;

  result.data.sentences.forEach((s) => {
    const starttimestamp = new Date(s.start_utc).toISOString().slice(11, 19); // HH:MM:SS
    const endtimestamp = new Date(s.end_utc).toISOString().slice(11, 19); // HH:MM:SS
    fileContent += `[${starttimestamp}] - [${endtimestamp}] || Speaker ${s.speaker}: ${s.text}\n`;
  });

  // Write to file
  fs.writeFileSync(filePath, fileContent, "utf-8");
  console.log(`✅ Transcription saved at: ${filePath}`);
};