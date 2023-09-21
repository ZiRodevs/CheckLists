import { createTask } from '../controllers/create-task';
import { testRoute } from '../controllers/test-route';
import express, { Router } from 'express';

const router: Router = express.Router();

router.post('/create-task', createTask);
router.get('/:id?', testRoute);

export default router;
