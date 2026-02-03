import { Router } from 'express';
import { createOrder, getOrder } from './order.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

router.post('/', authMiddleware, createOrder);
router.get('/:id', authMiddleware, getOrder);

export default router;
