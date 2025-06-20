import express from 'express';
import { getFile } from './speechProcesser.controller.js';
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get('/:type/:filePath', authenticate, getFile);

export default router;