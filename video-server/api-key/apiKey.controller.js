import httpStatus from 'http-status-codes';
import { sendResponse } from '../utils/response.js';
import {createApiKey, updateApiKey, deleteApiKey } from './apiKey.services.js';

export const createApiKeyController = async (req, res) => {
    try{
        const userId = req.user.id;
        const { name } = req.body

        const apiKeyData = await createApiKey(userId, name);

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
    } catch (err) {
        return sendResponse(
            res,
            httpStatus.StatusCodes.BAD_REQUEST,
            false,
            err.message
        )

    }
}

export const updateApiKeyController = async (req, res) => {
    try{
        const userId = req.user.id;
        const { isActive, name } = req.body;
        if(typeof isActive !== 'boolean'){
            return sendResponse(
                res,
                httpStatus.StatusCodes.BAD_REQUEST,
                false,
                'Invalid isActive type. isActive must be a boolean'
            )
        }

        const updatedKey = await updateApiKey(userId, isActive, name);

        return sendResponse(
            res,
            httpStatus.StatusCodes.OK,
            true,
            'API key status updated successfully',
            updatedKey
        )
    } catch (error) {
        sendResponse(
            res,
            httpStatus.StatusCodes.BAD_REQUEST,
            false,
            error.message
        )
    }
}


export const deleteApiKeyController = async (req, res) => {
    try {
        const userId = req.user.userId;
        const deletedKey = await deleteApiKey(userId);

        return sendResponse(
            res,
            httpStatus.StatusCodes.OK,
            true,
            'API key deleted successfully',
            deletedKey
        )
    } catch (error) {
        sendResponse(
            res,
            httpStatus.StatusCodes.BAD_REQUEST,
            false,
            error.message
        )
    }
}
