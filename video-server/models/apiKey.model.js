import { application } from 'express';
import mongoose from 'mongoose';

const apiKeySchema = new mongoose.Schema({
    applicationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Application' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    accessKey: { type: String, unique: true },
    secretKeyHash: String,
    createdAt: Date,
    isActive: { type: Boolean, default: true },
});

export default mongoose.model('ApiKey', apiKeySchema);