import Application from "../models/application.model.js";

export const findApplicationObjectIdByApplicationId = async (applicationId) => {
    const application = await Application.findOne({ applicationId }).select('_id');

    return application ? application._id : null;
};
