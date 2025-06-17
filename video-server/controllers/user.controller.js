import {getUserProfile} from "../services/user.service.js";
import {sendResponse} from "../utils/response.js";
import httpStatus from "http-status-codes";


export const getProfile = async (req, res) => {
    try{
        const { userId } = req.user


        const user = await getUserProfile(userId);


        return sendResponse(
            res,
            httpStatus.StatusCodes.OK,
            true,
            'Profile fetched successfully',
            user
        )
    } catch (err) {
        return res.status(400).json({
            status: false,
            message: err.message
        });
    }
};
