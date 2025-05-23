import express from 'express';
import {
    register,
    login,
    profile,
    logout
} from '../controllers/auth.controller.js';
import {validateBody} from "../middlewares/validate.middleware.js";
import {registerSchema} from "../validators/auth.validator.js";
import {authenticate} from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/register', validateBody(registerSchema), register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/profile', profile);

export default router;
