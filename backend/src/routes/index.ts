import { testRoute } from '../controllers/test-route';
import express, { Router } from 'express';

const router: Router = express.Router();

router.get('/:id?', testRoute);

export default router;
