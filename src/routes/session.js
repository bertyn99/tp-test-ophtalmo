import express from 'express';
import sessionController from '../controllers/sessionController.js';

const router = express.Router();

router.post('/', sessionController.createSessionHandler);
router.get('/', sessionController.getSessionsHandler);
router.patch('/:id', sessionController.updateSessionHandler);
router.get('/stats', sessionController.getSessionStatsHandler);

export default router;