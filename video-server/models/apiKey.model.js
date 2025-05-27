import { application } from 'express';
import mongoose from 'mongoose';

const apiKeySchema = new mongoose.Schema({
    accessKey: { type: String, unique: true },
    secretKeyHash: String,
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: Date,
    isActive: { type: Boolean, default: true },
});

export default mongoose.model('ApiKey', apiKeySchema);