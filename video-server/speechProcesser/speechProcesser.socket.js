import {initRecording, processAudioChunk, finalizeTrascription} from "./speechProcesser.services.js";

export const socketHandler = (socket) => {
  socket.on("start-recording", (data) => {
    console.log("Recording started:", data.rid);
    initRecording(socket, data); // maybe init DB or file
  });

  socket.on("audio-chunk", async (buffer) => {
    processAudioChunk(socket, buffer);
  });

  socket.on("process-recording", () => {
    const result = finalizeTrascription(socket);
    //socket.emit("transcription", result);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
};
