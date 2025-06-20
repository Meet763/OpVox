import path from "path";
import fs from "fs";

export const getFile = (req, res) => {
  const { type, filePath } = req.params;

  let baseDir;

  if (type === "audio") {
    baseDir = "uploads";
  } else if (type === "transcripts") {
    baseDir = "transcripts";
  } else {
    return res.status(400).json({ error: "Invalid file type" });
  }

  const file = path.join(process.cwd(), baseDir, `${filePath}`);

  // Check if file exists
  if (!fs.existsSync(file)) {
    return res.status(404).json({ error: "File not found" });
  }

  res.sendFile(file);
};
