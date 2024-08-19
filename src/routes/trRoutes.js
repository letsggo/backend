import express from 'express';
import { saveTravelRoute } from '../controllers/trController.js';
import authenticateToken from '../middleware/auth.js';

const router = express.Router();

router.post('/my-travel/travel-route', authenticateToken, saveTravelRoute); // 여행 경로 저장

export default router;
