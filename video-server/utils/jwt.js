// token.js
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'secret';

export const generateToken = ({userId, email}) => {
    console.log(userId, email)
    return jwt.sign({ userId, email }, secret, { expiresIn: '1d' });
};

export const verifyToken = (token) => {
    return jwt.verify(token, secret);
};
