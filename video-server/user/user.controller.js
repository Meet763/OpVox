import { getUserProfile, updateUserProfile } from "./user.service.js";
import { sendResponse } from "../utils/response.js";
import httpStatus from "http-status-codes";

export const getProfile = async (req, res) => {
  try {
    const userId  = req.user._id;

    const user = await getUserProfile(userId);
    
    if(!user){
       throw new Error('Your profile not found');
    }

    return sendResponse(
      res,
      httpStatus.StatusCodes.OK,
      true,
      "Profile fetched successfully",
      user
    );
  } catch (err) {
    return sendResponse(
      res,
      httpStatus.StatusCodes.BAD_REQUEST,
      false,
      err.message
    );
  }
};

export const updateProfile = async (req, res) => {
  try{
    const userId = req.user._id;

    const userData = req.body;

    const updatedUser = await updateUserProfile(userId, userData);

    if(!updatedUser){
       throw new Error('Your profile not updated');
    }

    return sendResponse(
      res,
      httpStatus.StatusCodes.OK,
      true,
      "Profile updated successfully",
      updatedUser
    );

  }catch(err){
     return sendResponse(
      res,
      httpStatus.StatusCodes.BAD_REQUEST,
      false,
      err.message
    );

  }
}
