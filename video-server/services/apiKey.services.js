import { generateAPIKey, hashSecretKey } from '../utils/keyUtils.js';
import ApiKey from '../models/apiKey.model.js'
import { findApplicationIdByUserId } from '../services/application.service.js'

export const generateApiKeyForUser = async(userId) => {
    const{ accessKey, secretKey } = generateAPIKey();
    const secretKeyHash = hashSecretKey(secretKey);
    const application_id = await findApplicationIdByUserId(userId)

    await ApiKey.create({
        applicationId: application_id,
        userId: userId,
        accessKey: accessKey,
        secretKeyHash: secretKeyHash,
        createdAt: new Date(),
        isActive: true,
    })

    return { accessKey, secretKey };
}