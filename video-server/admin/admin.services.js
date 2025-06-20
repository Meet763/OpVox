import User from "../user/user.model.js";
import ApiKey from "../api-key/apiKey.model.js";
import mongoose from "mongoose";

export const getUsersList = async () => {
  return await User.find(
    {},
    {
      username: 1,
      email: 1,
      mobileNumber: 1,
      isActive: 1,
    }
  );
};

export const getUserDetailList = async (userId) => {
  return await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(userId), // convert string to ObjectId
      },
    },
    {
      $lookup: {
        from: "apikeys",
        localField: "_id",
        foreignField: "created_by",
        as: "userApiKeys",
      },
    },
    {
      $addFields: {
        totalApiKeys: { $size: "$userApiKeys" },
      },
    },
    {
      $project: {
        _id: 1,
        username: 1,
        email: 1,
        mobileNumber: 1,
        isActive: 1,
        totalApiKeys: 1,
        apiKeys: "$userApiKeys",
      },
    },
  ]);
};

export const updateUserDetailList = async (
  userId,
  updatedData = {},
  apiKeys = []
) => {
  const isUserUpdate = Object.keys(updatedData).length > 0;
  const isApiKeyUpdate = Array.isArray(apiKeys) && apiKeys.length > 0;

  if (!isUserUpdate && !isApiKeyUpdate) {
    throw new Error("No valid update data provided");
  }

  let updatedUser = null;
  let updatedApiKeys = [];

  if (isUserUpdate) {
    updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updatedData },
      { new: true }
    );
    console.log("end at userupdate");
  }

  if (isApiKeyUpdate) {
    console.log("starting at is apikeys");
    const updatePromises = apiKeys.map(({ _id, isActive }) => {
      if (!_id || typeof isActive !== "boolean") return null;

      return ApiKey.findOneAndUpdate(
        { _id, created_by: userId },
        { $set: { isActive } },
        { new: true }
      );
    });

    updatedApiKeys = await Promise.all(updatePromises.filter(Boolean));
  }

  return{
    userData: updatedUser,
    apikeys: updatedApiKeys
  }
};
