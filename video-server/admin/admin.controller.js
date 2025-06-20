import { sendResponse } from "../utils/response.js";
import httpStatus from "http-status-codes";
import { getUsersList, getUserDetailList, updateUserDetailList } from "./admin.services.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await getUsersList();

    return sendResponse(
      res,
      httpStatus.StatusCodes.OK,
      true,
      "All Users fetched successfully",
      users
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

export const getUserDetail = async (req, res) => {
  try {
    const userId = req.params.userId;

    console.log(userId);

    const userDetail = await getUserDetailList(userId);
    
    return sendResponse(
      res,
      httpStatus.StatusCodes.OK,
      true,
      "User fetched successfully",
      userDetail
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

export const updateUserDetail = async (req, res) => {
  try {

    const userId = req.params.userId;

    const { apiKeys, ...updatedData} = req.body;

    const updatedUserDetail = await updateUserDetailList(userId, updatedData, apiKeys || []);

    return sendResponse(
      res,
      httpStatus.StatusCodes.OK,
      true,
      "User detail successfully updated",
      updatedUserDetail
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
