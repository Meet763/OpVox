// token.js
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'secret';

export const generateToken = ({ userId, email }) => {
    // const token = jwt.sign({ userId, email }, secret, { expiresIn: '1d' });
    return jwt.sign({ userId, email }, secret, { expiresIn: '1d' });
};

export const verifyToken = (token) => {
    return jwt.verify(token, secret);
};
