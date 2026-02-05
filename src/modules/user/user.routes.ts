import { Router } from 'express';
import {
  createUser,
  getMe,
  deleteMe,
  updateName,
  assignRole,
  getUserRoles,
} from './user.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     tags:
 *       - Users
 *     summary: Register a new user
 *     description: Register using name, email and password. Returns access and refresh tokens.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Sarthak Mishra
 *               email:
 *                 type: string
 *                 example: sarthak@gmail.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input or user already exists
 */
router.post('/register', createUser);

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get logged-in and get user details
 *     description: Returns id, name, email and role of the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User data returned successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/me', authMiddleware, getMe);

/**
 * @swagger
 * /api/users/me:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Delete logged-in user account
 *     description: Permanently deletes the authenticated user's account.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized
 */
router.delete('/me', authMiddleware, deleteMe);

/**
 * @swagger
 * /api/users/me:
 *   patch:
 *     tags:
 *       - Users
 *     summary: Update logged-in user's name
 *     description: Allows a user to update their name.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: New Name
 *     responses:
 *       200:
 *         description: Name updated successfully
 *       401:
 *         description: Unauthorized
 */
router.patch('/me', authMiddleware, updateName);

/**
 * @swagger
 * /api/users/{id}/role:
 *   post:
 *     summary: Assign role to a user
 *     description: >
 *       Assigns a role to a user.
 *       Existing roles of the user are cleared before assigning the new role.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - roleId
 *             properties:
 *               roleId:
 *                 type: integer
 *                 example: 1
 *                 description: Role ID to assign
 *     responses:
 *       200:
 *         description: Role assigned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Role assigned successfully
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (missing MANAGE_ROLES permission)
 */
router.post('/:id/role', authMiddleware, assignRole);

/**
 * @swagger
 * /api/users/{id}/roles:
 *   get:
 *     summary: Get roles assigned to a user
 *     description: Returns all roles and permissions assigned to a user.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       200:
 *         description: User roles and permissions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: integer
 *                   example: 1
 *                 roles:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: ADMIN
 *                       permissions:
 *                         type: array
 *                         items:
 *                           type: string
 *                           example: CREATE_PRODUCT
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get('/:id/roles', authMiddleware, getUserRoles);
export default router;
