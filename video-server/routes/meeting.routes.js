import express from 'express';
import {authenticate} from '../middlewares/auth.middleware.js';
import { createMeetingController } from '../controllers/meeting.controller.js';

const router = express.Router();

router.post('/create', createMeetingController);
// router.post('/join/:meeting_code')

export default router;