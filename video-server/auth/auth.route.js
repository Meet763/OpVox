import express from 'express';
import {
    register,
    login,
    logout
} from '../auth/auth.controller.js';

import {validateBody} from "../middlewares/validate.middleware.js";
import {registerSchema} from "../validators/auth.validator.js";
import {authenticate} from "../middlewares/auth.middleware.js";
import {loginSchema} from "../validators/auth.validator.js";

const router = express.Router();

router.post('/register', validateBody(registerSchema), register);
router.post('/login', validateBody(loginSchema),login);
router.get('/logout', logout);
// router.get('/profile', profile);

export default router;
