import { Router } from 'express';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from './product.controller';
import { authMiddleware, requiredRole } from '../../middlewares/auth.middleware';

const router = Router();

router.post('/', authMiddleware, requiredRole('ADMIN'), createProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.patch('/:id', authMiddleware, updateProduct);
router.delete('/:id', authMiddleware, deleteProduct);

export default router;
