import { socketHandler } from "./speechProcesser.socket.js";
import { apiKeyAuthSocket } from "../middlewares/apikeyAuthSocket.middleware.js";
import { Server } from "socket.io";

export const initSpeechProcesser = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.of("/api/v1/speechProcesser")
    .use(apiKeyAuthSocket)
    .on("connection", (socket) => {
      socket.context = {};
      console.log("New client connected:", socket.id);
      socketHandler(socket); // delegate events to controller
    });
};
