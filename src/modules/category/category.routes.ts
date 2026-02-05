import { Router } from 'express';
import {
  createCategory,
  getCategories,
  getCategoryById,
  deleteCategory,
  updateCategory,
} from './category.controller';
import { authMiddleware, requirePermission } from '../../middlewares/auth.middleware';

const router = Router();

/**
 * @swagger
 * /api/categories:
 *   post:
 *     tags:
 *       - Categories
 *     summary: Create a new category
 *     description: Create a new product category. Only ADMIN users are allowed.
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
 *             properties:
 *               name:
 *                 type: string
 *                 example: Electronics
 *     responses:
 *       201:
 *         description: Category created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin only)
 */
router.post('/', authMiddleware, requirePermission('CREATE_CATEGORY'), createCategory);

/**
 * @swagger
 * /api/categories:
 *   get:
 *     tags:
 *       - Categories
 *     summary: Get all categories
 *     description: Fetch a list of all available product categories.
 *     responses:
 *       200:
 *         description: List of categories returned successfully
 */
router.get('/', authMiddleware, requirePermission('VIEW_CATEGORIES'), getCategories);

/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     tags:
 *       - Categories
 *     summary: Get category by ID
 *     description: Fetch details of a single category using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Category found
 *       404:
 *         description: Category not found
 */
router.get('/:id', authMiddleware, requirePermission('VIEW_CATEGORIES'), getCategoryById);

/**
 * @swagger
 * /api/categories/{id}:
 *   patch:
 *     tags:
 *       - Categories
 *     summary: Update category
 *     description: Update the name of an existing category.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Category Name
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Category not found
 */
router.patch('/:id', authMiddleware, requirePermission('UPDATE_CATEGORY'), updateCategory);

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     tags:
 *       - Categories
 *     summary: Delete category
 *     description: Delete a category by ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       204:
 *         description: Category deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Category not found
 */
router.delete('/:id', authMiddleware, requirePermission('DELETE_CATEGORY'), deleteCategory);

export default router;
