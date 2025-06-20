import express from "express";
import { authorizeRoles } from "../middlewares/checkRole.middleware.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { getAllUsers,  getUserDetail, updateUserDetail } from "./admin.controller.js";


const router = express.Router();

//Admin's API, 
router.get('/users', authenticate, authorizeRoles('admin'), getAllUsers)
router.get('/users/:userId', authenticate, authorizeRoles('admin'), getUserDetail)
router.put('/users/:userId', authenticate, authorizeRoles('admin'), updateUserDetail)

export default router;
