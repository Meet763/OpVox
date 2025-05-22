import mongoose from 'mongoose';
import User from "./user.model.js"
import Application from "./application.model.js"

async function createSampleData() {
    await mongoose.connect('mongodb://localhost:27017/webrtc_video_call'); // Replace with your DB

    // // Step 1: Create a User
    // const user = await User.create({
    //     name: 'John Doe',
    //     email: 'john@example.com',
    //     mobileNumber: '1234567890',
    //     password: 'hashed_password_here', // In real life, hash the password!
    //     isEmailVerified: false,
    //     isMobileNumberVerified: false,
    //     roles: ['user'],
    //     isActive: true,
    //     isSuperAdmin: false
    // });
    //
    // console.log('User created:', user);

    // Step 2: Create an Application and link it to the user
    const app = await Application.create({
        applicationId: 'APP001',
        name: 'Demo Application',
        isActive: true,
    });

    console.log('Application created:', app);

    // // Step 3: Update user with application_id
    // user.application_id = app._id;
    // await user.save();
    //
    // console.log('User updated with application_id:', user);

    await mongoose.disconnect();
}

createSampleData().catch(console.error);
