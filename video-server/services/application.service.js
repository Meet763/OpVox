import Application from "../models/application.model.js";
import User from "../models/user.model.js"

export const findApplicationObjectIdByApplicationId = async (applicationId) => {
    const application = await Application.findOne({ applicationId }).select('_id');

    return application ? application._id : null;
};

export const findApplicationIdByUserId = async (userId) => {
    const user = await User.findById(userId).select('application_id');
    
    return user ? user.application_id : null;
};
