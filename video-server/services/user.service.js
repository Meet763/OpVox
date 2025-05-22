import User from '../models/user.model.js';
import { findApplicationObjectIdByApplicationId } from "./application.service.js";
import { hashingPassword } from "../utils/password.js";

export const findUserByEmail = (email) => {
    return User.findOne({
        email: email
    });
};


export const createUser = async (userData) => {
    const userExists = await findUserByEmail(userData.email);
    if (userExists) {
        throw new Error('User already exists');
    }
    const applicationId = await findApplicationObjectIdByApplicationId(userData.application_id);
    if (!applicationId) {
        throw new Error('Application does not exist');
    }

    const hashedPassword = await hashingPassword(userData.password);

    const user = await User.create({
        ...userData,
        password: hashedPassword,
        application_id: applicationId
    });

    return user;
}

