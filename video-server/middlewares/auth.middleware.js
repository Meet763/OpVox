import { verifyToken } from "../utils/jwt.js";
import User from "../user/user.model.js"

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({
          status: false,
          message: "Authorization token missing or malformed",
        });
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({
        status: false,
        message: "User not found.",
      });
    }

    req.user = user;

    next();
    // eslint-disable-next-line no-unused-vars
  } catch (err) {
    return res
      .status(401)
      .json({ status: false, message: "Invalid or expired token" });
  }
};
