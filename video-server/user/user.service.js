import User from "./user.model.js";
import { hashingPassword } from "../utils/password.js";

export const findUserByEmail = (email) => {
  return User.findOne({
    email: email,
  });
};

export const getUserProfile = (userId) => {
  return User.findById(userId);
};

export const createUser = async (userData) => {
  const { role = "user" } = userData;

  // Check if an admin already exists
  if (role === "admin") {
    const adminExists = await User.findOne({ role: "admin" });
    if (adminExists) {
      throw new Error("Admin already exists. Cannot create another admin.");
    }
  }

  const hashedPassword = await hashingPassword(userData.password);

  const user = await User.create({
    ...userData,
    password: hashedPassword,
  });

  return user;
};

export const updateUserProfile = async (userId, userData) => {
  
  const updatedUserData = await User.findOneAndUpdate(
    userId, 
    { $set: userData }, 
    { new: true }
  );
  
  if (!updatedUserData) {
    throw new Error(" User Not Found ");
  }

  return updatedUserData;
};
