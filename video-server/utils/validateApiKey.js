// middlewares/auth/validateApiKey.js
import ApiKey from "../api-key/apiKey.model.js";
import bcrypt from "bcrypt";

export const validateApiKey = async (accessKey, secretKey) => {
  console.log("from validate api key");
  if (!accessKey || !secretKey) {
    throw new Error("Missing apiKey or secretKey");
  }

  const record = await ApiKey.findOne({ accessKey: accessKey }).populate(
    "created_by"
  );

  if (!record) {
    throw new Error("Invalid apiKey");
  }

  if (!record.isActive) {
    throw new Error("API key is inactive");
  }

  if (record.isAdminLocked) {
    throw new Error("API key is suspended by admin, please contact admin");
  }

  if (!record.created_by || !record.created_by.isActive) {
    throw new Error("User who owns this API key is inactive.");
  }

  const isValid = bcrypt.compare(secretKey, record.secretKeyHash);
  if (!isValid) {
    throw new Error("Invalid secretKey");
  }

  const user = record.created_by;
  console.log(user)
  
  return {
    userId: user._id
  }// or any data you want to attach to context
};

