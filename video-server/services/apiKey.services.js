import {
    generateAccessKeyAndSecretKey,
    hashSecretKey
} from '../utils/keyUtils.js';
import ApiKey from '../models/apiKey.model.js'
import User from "../models/user.model.js";

//Get API Key : Function
export const getApiKey = async(userId) => {
    const apiKey = await ApiKey.findOne({ created_by: userId});
    //check if API Key exists for this user
    if(!apiKey){
        throw new Error('API Key not found');
    }
    return apiKey;
}

//Create API Key : Function
export const createApiKey = async(userId) => {
    //check if API Key already exists for this user
    const existingKey = await ApiKey.findOne({ created_by: userId });
    if (existingKey) {
        throw new Error('API key already exists for this user');
    }
    //generate Access Key and Secret Key
    const{ accessKey, secretKey } = await generateAccessKeyAndSecretKey();
    //hasing Secret Key
    const secretKeyHash = await hashSecretKey(secretKey);

    //Database Insertion
    await ApiKey.create({
        created_by: userId,
        accessKey: accessKey,
        secretKeyHash: secretKeyHash,
        isActive: true,
    })
    return {
        accessKey,
        secretKey
    };
}

//Update API Key : Function
export const updateApiKey = async(userId, isActive) => {

    //Database Update
    const updatedKey = await ApiKey.findOneAndUpdate(
        { created_by: userId },
        { isActive },
        { new: true }
    )

    if(!updatedKey){
        throw new Error('API Key not found');
    }
    return updatedKey;
}

//Delete API Key : Function
export const deleteApiKey = async(userId) => {

    //Database Delete
    const deletedKey = await ApiKey.findOneAndDelete({ created_by: userId });

    if(!deletedKey){
        throw new Error('API Key not found');
    }
    return deletedKey;
}
