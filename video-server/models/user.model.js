import mongoose from 'mongoose';
import { type } from 'os';


const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    mobileNumber: String,
    password: String,
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    isMobileNumberVerified: {
        type: Boolean,
        default: false
    },
    roles: {
        type: [String],
        enum: ['User', 'Admin'],
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isSuperAdmin: {
        type: Boolean,
        default: false
    },
    application_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application'
    },
    organization_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization'
    },
    isApplication:{
        type:Boolean,
    },
    isOrganization:{
        type:Boolean,
    },
    resetPasswordToken: {
        type: String,
        default: null
    },
    resetPasswordExpires: {
        type: Date,
        default: null
    },
    varificationToken: {
        type: String,
        default: null
    },
    varificationExpires: {
        type: Date,
        default: null
    },
    lastLogin: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;
