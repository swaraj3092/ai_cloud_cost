import { Router } from 'express';
import {
  getDashboard,
  getAiActions,
  getAnalytics,
  getInfrastructure,
  getCodeToCost,
  chatWithAi
} from '../controllers/dbController';

const router = Router();

router.get('/dashboard', getDashboard);
router.get('/ai-actions', getAiActions);
router.get('/analytics', getAnalytics);
router.get('/infrastructure', getInfrastructure);
router.get('/code-to-cost', getCodeToCost);
router.post('/chat', chatWithAi);

export default router;
