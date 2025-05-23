import crypto from 'crypto';
import bcrypt from 'bcrypt';

export const generateAPIKey = () => {
    const accessKey = crypto.randomBytes(16).toString('hex');
    const secretKey = crypto.randomBytes(32).toString('hex');
    return { accessKey, secretKey };
};

export const hashSecretKey = (secretKey) => {
    return bcrypt.hash(secretKey, 10);
};

export const compareSecretKey = (secretKey, hashedSecretKey) => {
    return bcrypt.compare(secretKey, hashedSecretKey);
}
