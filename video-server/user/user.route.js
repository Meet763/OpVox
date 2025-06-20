import express from "express";
import { getProfile, updateProfile } from "./user.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validateBody } from "../middlewares/validate.middleware.js";
import { userUpdateSchema } from "../validators/auth.validator.js";

const router = express.Router();

//Users Api
router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, validateBody(userUpdateSchema), updateProfile);

export default router;
