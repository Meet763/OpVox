//import applicationRoutes from "./routes/application.routes.js";

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
import http from "http";

//import database init file 
import { connectDB } from './db.js'

//initialize database
connectDB();

//Files
import authRoutes from './auth/auth.route.js';
import meetingRoutes from './meeting/meeting.routes.js'
import userRoutes from './user/user.route.js';
import adminRoutes from './admin/admin.routes.js'
import apiKeyRoutes from './api-key/apiKey.routes.js';
import speechProcesserRoutes from './speechProcesser/speechProcesser.routes.js'
import { initSpeechProcesser } from './speechProcesser/speechProcesser.init.js'

//Express
const app = express();
const server = http.createServer(app); // only ONE server instance
const PORT = process.env.PORT || 3000;

//CORS
app.use(
  cors({
    origin: "http://localhost:5173", // or your frontend URL
    credentials: true,
  })
);

//Middleware
app.use(cors());
app.use(express.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/meeting', meetingRoutes)
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/admin', adminRoutes)
app.use('/api/v1/api-key', apiKeyRoutes);
//app.use('/api/v1/application', applicationRoutes);
app.use('/api/v1/speechprocesser', speechProcesserRoutes)

//speechProcesser initialize
initSpeechProcesser(server);

//Welcome Routes
app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
