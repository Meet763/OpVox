console.log('server.js');

//ENV File
// PORT=3000
// MONGODB_URI=mongodb://localhost:27017/webrtc_video_call
// JWT_SECRET=thisismykey

require("dotenv").config();


//imports libraries
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

//Express
const app = express();
const PORT = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json());

//Welcome Routes
app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

//Database Connection
mongoose.connect(process.env.MONGODB_URI)
    .then((result) => console.log("Database Connected"))
    .catch((error) => console.log("Database Connection Error..", error));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
