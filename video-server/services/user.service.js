import User from '../models/user.model.js';
import { hashingPassword } from "../utils/password.js";

export const findUserByEmail = (email) => {
    return User.findOne({
        email: email
    });
};

export const createUser = async (userData) => {
    const hashedPassword = await hashingPassword(userData.password);

    try {
        const user = await User.create({
            ...userData,
            password: hashedPassword,
            application_id: applicationId
        });
    }


    return user;
}
