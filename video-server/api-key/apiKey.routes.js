import express from 'express';
import { createApiKeyController, deleteApiKeyController, updateApiKeyController } from '../api-key/apiKey.controller.js';
import {authenticate} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post('/create', authenticate, createApiKeyController);
router.put('/update', authenticate, updateApiKeyController);
router.delete('/delete', authenticate, deleteApiKeyController);

export default router;
