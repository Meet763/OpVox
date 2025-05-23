import { findUserByEmail } from "./user.service.js";
import { comparePassword } from "../utils/password.js";
import { generateToken } from "../utils/jwt.js";

export const loginUser = async ({ email, password }) => {
    const user = await findUserByEmail(email);  // await here!
    if (!user) {
        throw new Error('User does not exist');
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }

    user.lastLogin = Date.now();
    await user.save();

    const token = generateToken({ userId: user._id, email: user.email });



    return {
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            application_id: user.application_id
        },
        token
    };
}
