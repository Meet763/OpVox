import crypto from 'crypto';
import bcrypt from 'bcrypt';

//generate access key and secret key
export const generateAccessKeyAndSecretKey = () => {
    const accessKey = crypto.randomBytes(16).toString('hex');
    const secretKey = crypto.randomBytes(32).toString('hex');
    return {
        accessKey,
        secretKey
    };
};

//hash secret key
export const hashSecretKey = (secretKey) => {
    return bcrypt.hash(secretKey, 10);
};

//compare secret key
export const compareSecretKey = (secretKey, hashedSecretKey) => {
    return bcrypt.compare(secretKey, hashedSecretKey);
}
