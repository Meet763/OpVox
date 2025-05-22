/**
 * Standardized API response
 * @param {Object} res - Express response object
 * @param {Number} statusCode - HTTP status code
 * @param {Boolean} success - true | false
 * @param {String} message - Message for the client
 * @param {Object} [data] - Optional payload
 */
// utils/response.js
export const sendResponse = (res, statusCode, success, message, data) => {
    const response = {
        status: success,
        message,
    };

    if (data !== undefined && data !== null) {
        response.data = data;
    }

    return res.status(statusCode).json(response);
};
