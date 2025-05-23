import httpStatus from 'http-status-codes';
import { sendResponse } from '../utils/response.js';
import { generateApiKeyForUser } from '../services/apiKey.services.js';

export const createApiKeyController = async (req, res) => {
    try{
        const userId = req.user.userId;
        console.log(userId)
        const apiKeyData = await generateApiKeyForUser(userId);

        return sendResponse(
            res,
            httpStatus.StatusCodes.CREATED,
            true,
            'API Key Successfully Generated',
            {
                accessKey: apiKeyData.accessKey,
                secretKey: apiKeyData.secretKey
            }
        );
    }catch (err){
        return sendResponse(
            res,
            httpStatus.StatusCodes.BAD_REQUEST,
            false,
            err.message
        )

    }
}