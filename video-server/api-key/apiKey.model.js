// Author: Meet
// File: apiKey.model.js
// Version: 1.0.0
// Description: Mongoose schema for API key management
// Created: 2025-05-27

import mongoose from 'mongoose';

const apiKeySchema = new mongoose.Schema(
    {
        name:{
            type: String,
            unique: true
        },
        accessKey: {
            type: String,
            unique: true
        },
        secretKeyHash: String,
        created_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        isActive: {
            type: Boolean,
            default: true
        },
        isAdminLocked: {
            type: Boolean,
            default: false
        }
    },
    {
    timestamps: true
    }
);

export default mongoose.model('ApiKey', apiKeySchema);
