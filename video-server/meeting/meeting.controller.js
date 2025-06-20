import httpStatus from 'http-status-codes';
import { createMeeting } from './meeting.services.js';
import { sendResponse } from '../utils/response.js';


export const createMeetingController = async (req, res) => {
    try{

        const newMeeting = await createMeeting(req.body);

        return sendResponse(
            res,
            httpStatus.StatusCodes.CREATED,
            true,
            'Meeting Created Successfully',
            {
                newMeeting:newMeeting
            }
        );
    }catch(err){
        return sendResponse(
            res,
            httpStatus.StatusCodes.BAD_REQUEST,
            false,
            err.message
        )
    }
}