import express from 'express';
import {
    register,
    login,
    logout
} from '../controllers/auth.controller.js';

import {validateBody} from "../middlewares/validate.middleware.js";
import {loginSchema, registerSchema} from "../validators/auth.validator.js";

const router = express.Router();

router.post('/register', validateBody(registerSchema), register);
router.post('/login', validateBody(loginSchema),login);
router.get('/logout', logout);
// router.get('/profile', profile);

export default router;
