import express from 'express'
const router = express.Router();

router.post('/create', authenticate, createApiKeyController);

export default router;
