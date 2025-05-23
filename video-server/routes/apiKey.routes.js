import express from 'express';
import { createApiKeyController } from '../controllers/apiKey.controller';

const router = express.Router();

router.post('/api-keys', authenticate, createApiKeyController);

export default router;
