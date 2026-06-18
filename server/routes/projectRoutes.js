import express from 'express';
import { getProjectDashboardData } from '../controllers/projectController.js';

const router = express.Router();

router.get('/dashboard', getProjectDashboardData);

export default router;
