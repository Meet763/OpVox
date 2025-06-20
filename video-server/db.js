// db.js
import mongoose from "mongoose";
// const mongoose = require("mongoose")

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/opvox');
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

//module.exports = connectDB
