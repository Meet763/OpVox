import httpStatus from "http-status-codes";
import { createUser } from "../user/user.service.js";
import { sendResponse } from "../utils/response.js";
import { loginUser } from "./auth.service.js";
import User from "../user/user.model.js";

export const register = async (req, res) => {
  try {

    const newUser = await createUser(req.body);

    return sendResponse(
      res,
      httpStatus.StatusCodes.CREATED,
      true,
      "User registered successfully",
      {
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      }
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

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Pass an object, as loginUser expects destructured param
    const loginData = await loginUser({ email, password });

    //Logic of cookie set in backend left

    //
    return sendResponse(
      res,
      httpStatus.StatusCodes.OK,
      true,
      "Login successful",
      loginData
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

export const logout = (req, res) => {
  res.json({
    status: true,
    message: "Logout API",
  });
};
