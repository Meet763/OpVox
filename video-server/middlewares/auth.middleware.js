import { verifyToken } from '../utils/jwt.js';

export const authenticate = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ status: false, message: 'Authorization token missing or malformed' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = verifyToken(token);

        req.user = decoded;

        next();
        // eslint-disable-next-line no-unused-vars
    } catch (err) {
        return res.status(401).json({ status: false, message: 'Invalid or expired token' });
    }
};
