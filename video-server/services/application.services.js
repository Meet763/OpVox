import Application from '../models/application.model.js'

export const findApplicationByEmail = (email) => {
    return Application.findOne({
        email: email
    });
};

export const createNewApplication = async (applicationData) => {

    const applicationExist = await findApplicationByEmail(applicationData.email);
    if (applicationExist){
        throw new Error('Application already exists');
    }

    const Application = new Application.create({
        applicationData
    })
}

export const updateApplication = async ()