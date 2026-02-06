import { Router } from 'express';
import { authMiddleware, requirePermission } from '../../middlewares/auth.middleware';
import { attachPermissionToRole, removePermissionFromRole } from './permission.controller';

const router = Router();

/**
 * @swagger
 * /api/permissions/:
 *   post:
 *     summary: Attach a permission to a role
 *     description: |
 *       Assigns a permission to a role.
 *       Requires MANAGE_ROLES permission.
 *     tags:
 *       - Permissions
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - roleName
 *               - permissions
 *             properties:
 *               roleName:
 *                 type: string
 *                 example: "USER"
 *               permissions:
 *                 type: string[]
 *                 example: ["CREATE_PRODUCT","VIEW_CATEGORIES","PLACE_ORDER"]
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
router.post('/', authMiddleware, requirePermission('MANAGE_ROLES'), attachPermissionToRole);

/**
 * @swagger
 * /api/permissions/remove:
 *   delete:
 *     summary: Remove permissions from a role
 *     tags:
 *       - Permissions
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - roleName
 *               - permissions
 *             properties:
 *               roleName:
 *                 type: string
 *                 example: USER
 *               permissions:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ['CREATE_PRODUCT', 'PLACE_ORDER']
 *     responses:
 *       200:
 *         description: Permissions removed successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (missing MANAGE_ROLES permission)
 *       404:
 *         description: Role or permission not found
 */
router.delete(
  '/remove',
  authMiddleware,
  requirePermission('MANAGE_ROLES'),
  removePermissionFromRole,
);
export default router;
