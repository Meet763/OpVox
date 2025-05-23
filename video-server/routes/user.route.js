import express from "express";
import {getProfile} from "../controllers/user.controller.js";
import {authenticate} from "../middlewares/auth.middleware.js";





const router = express.Router();

router.get('/profile', authenticate, getProfile);
// router.put('/profile/:id', profile);

export default router;
