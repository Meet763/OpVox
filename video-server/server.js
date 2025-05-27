console.log('server.js');

//ENV File
// PORT=3000
// MONGODB_URI=mongodb://localhost:27017/webrtc_video_call
// JWT_SECRET=thisismykey

import dotenv from 'dotenv';
dotenv.config();


//imports libraries
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';


//Files
import authRoutes from './routes/auth.route.js';
import meetingRoutes from './routes/meeting.routes.js'
import userRoutes from './routes/user.route.js';

//Express
const app = express();
const PORT = process.env.PORT || 3000;

//Middleware
app.use(cors());
app.use(express.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/meeting', meetingRoutes)
app.use('/api/v1/user', userRoutes);

//Welcome Routes
app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

//Database Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Database Connected"))
    .catch((error) => console.log("Database Connection Error..", error));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
