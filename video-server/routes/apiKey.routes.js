import express from 'express';
import { createApiKeyController, deleteApiKeyController, updateApiKeyController } from '../controllers/apiKey.controller.js';
import {authenticate} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post('/create', authenticate, createApiKeyController);
router.post('/update', authenticate, updateApiKeyController);
router.delete('/delete', authenticate, deleteApiKeyController);

export default router;
