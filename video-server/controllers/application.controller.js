import httpStatus from 'http-status-codes'
import { createNewApplication } from '../services/application.services';

export const createApplicationController = async (req, res) => {
    try{

        const newApplication = await createNewApplication(req.body);

        return sendResponse(
            res,
            httpStatus.StatusCodes.CREATED,
            true,
            'New Application Created Successfully',
            newApplication
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
