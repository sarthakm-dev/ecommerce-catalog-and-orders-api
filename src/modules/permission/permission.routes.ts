import { Router } from 'express';
import { authMiddleware, requirePermission } from '../../middlewares/auth.middleware';
import { attachPermissionToRole } from './permission.controller';

const router = Router();

/**
 * @swagger
 * /api/permissions/{id}:
 *   post:
 *     summary: Attach a permission to a role
 *     description: |
 *       Assigns a permission to a role.
 *       Requires MANAGE_ROLES permission.
 *     tags:
 *       - Permissions
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Role ID to which permission will be attached
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - permissionId
 *             properties:
 *               permissionId:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       200:
 *         description: Permission attached successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *       403:
 *         description: Forbidden (missing MANAGE_ROLES permission)
 *       404:
 *         description: Role or permission not found
 */
router.post('/:id', authMiddleware, requirePermission('MANAGE_ROLES'), attachPermissionToRole);

export default router;
