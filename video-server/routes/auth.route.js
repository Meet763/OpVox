const express = require('express');
const {
    register,
    login,
    profile,
    logout
} = require('../controllers/auth.controller');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get("/profile", profile);


module.exports = router;
