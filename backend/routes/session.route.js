import express from 'express';
import {createSession,getMySessions,getUpcomingSessions,getPastSessions,deleteSession, getLatestCompletedSession} from '../controllers/session.controller.js';
import protectRoute from'../middleware/auth.middleware.js'; // your auth middleware

const router = express.Router();

router.post('/create',protectRoute,createSession);
router.get('/my',protectRoute,getMySessions);
router.get('/upcoming',protectRoute,getUpcomingSessions);
router.get('/past',protectRoute,getPastSessions);
router.delete('/delete/:sessionId',protectRoute,deleteSession);
router.get("/latest-completed/:otherUserId", protectRoute, getLatestCompletedSession);

export default router;