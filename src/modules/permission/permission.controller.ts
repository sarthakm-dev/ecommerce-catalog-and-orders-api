import { Request, Response, NextFunction } from 'express';
import { PermissionRepository } from './permission.repository';

export const attachPermissionToRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { roleName, permissions } = req.body;
    if (!roleName) {
      return res.status(400).json({
        message: 'roleName is required',
      });
    }
    const role = await PermissionRepository.getRoleId(roleName);
    const roleId = Number(role.id);
    if (Array.isArray(permissions) && permissions.length > 0) {
      const permissionIds = await PermissionRepository.getPermissionId(permissions);

      for (const { id: permissionId } of permissionIds) {
        await PermissionRepository.attachPermission(roleId, permissionId);
      }
    }

    res.json({ message: 'Role Assigned' });
  } catch (err) {
    next(err);
  }
};

export const getPermissionId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { permissions } = req.body;
    console.log('Permissions', permissions);
    if (!permissions) {
      return res.status(400).json({ message: 'permissions array is required' });
    }
    const result = await PermissionRepository.getPermissionId(permissions);
    console.log('Permission Res:', result);
    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};

export const getRoleId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { roleName } = req.body;
    if (!roleName) {
      return res.status(400).json({ message: 'roleName is required' });
    }
    const result = await PermissionRepository.getRoleId(roleName);
    console.log('Permission Res:', result);
    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};
