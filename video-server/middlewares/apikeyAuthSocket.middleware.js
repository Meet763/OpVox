// middlewares/auth/apiKey.socket.js
import { validateApiKey } from "../utils/validateApiKey.js";

export const apiKeyAuthSocket = async (socket, next) => {
  console.log("from middleware starting")
  const { accessKey, secretKey } = socket.handshake.auth;
  console.log("getting accesskey and secretkey: ", { accessKey, secretKey})

  try {
    const { userId } = await validateApiKey(accessKey, secretKey);
    console.log(userId)
    socket.userId = userId;
    next();
  } catch (err) {
    next(new Error(err.message));
  }
};
