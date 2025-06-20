import mongoose from 'mongoose';

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
        required: true,
        type: Boolean,
        default: false
    },
    isMobileNumberVerified: {
        required: true,
        type: Boolean,
        default: false
    },
    role: {
        required: true,
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    isActive: {
        required: true,
        type: Boolean,
        default: true
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
