import { Router } from 'express';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from './product.controller';
import { authMiddleware, requirePermission } from '../../middlewares/auth.middleware';

const router = Router();

/**
 * @swagger
 * /api/products:
 *   post:
 *     tags:
 *       - Products
 *     summary: Create a new product
 *     description: Create a new product under a category. Only ADMIN users are allowed.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - stock
 *               - categoryId
 *             properties:
 *               name:
 *                 type: string
 *                 example: iPhone 15
 *               price:
 *                 type: number
 *                 example: 79999
 *               stock:
 *                 type: integer
 *                 example: 20
 *               categoryId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Product created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin only)
 */
router.post('/', authMiddleware, requirePermission('CREATE_PRODUCT'), createProduct);

/**
 * @swagger
 * /api/products:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get all products
 *     description: Fetch all available products along with category information.
 *     responses:
 *       200:
 *         description: Product list retrieved successfully
 */
router.get('/', getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get product by ID
 *     description: Fetch detailed information of a single product.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 5
 *     responses:
 *       200:
 *         description: Product found
 *       404:
 *         description: Product not found
 */
router.get('/:id', getProductById);

/**
 * @swagger
 * /api/products/{id}:
 *   patch:
 *     tags:
 *       - Products
 *     summary: Update product
 *     description: Update product details such as name, price, stock, or category.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 5
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Product Name
 *               price:
 *                 type: number
 *                 example: 74999
 *               stock:
 *                 type: integer
 *                 example: 15
 *               categoryId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 */
router.patch('/:id', authMiddleware, requirePermission('UPDATE_PRODUCT'), updateProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     tags:
 *       - Products
 *     summary: Delete product
 *     description: Delete a product by ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 5
 *     responses:
 *       204:
 *         description: Product deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 */
router.delete('/:id', authMiddleware, requirePermission('DELETE_PRODUCT'), deleteProduct);

export default router;
