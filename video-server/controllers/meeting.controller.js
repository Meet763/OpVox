import httpStatus from 'http-status-codes';


export const createMeetingController = async (req, res) => {
    try{

        const newMeeting = await createMeeting(req.body);

        return sendResponse(
            res,
            httpStatus.StatusCodes.CREATED,
            true,
            'Meeting Created Successfully',
            {
                name: newUser.name,
                email: newUser.email,
                application_id: newUser.application_id,
            }
        );
    }catch(err){
        return sendResponse(
            res,
            httpStatus.StatusCodes.BAD_REQUESTL,
            false,
            err.message
        )
    }
}