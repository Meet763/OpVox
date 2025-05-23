import express from 'express';


const router = express.Router();

router.post('/create-meeting', authenticate, createApiKeysHandler);

export default router;