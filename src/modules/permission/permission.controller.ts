import { Request, Response, NextFunction } from 'express';
import { PermissionService } from './permission.service';

export const attachPermissionToRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { roleName, permissions } = req.body;

    if (!roleName || !Array.isArray(permissions)) {
      return res.status(400).json({
        message: 'roleName and permissions[] are required',
      });
    }

    await PermissionService.attachPermissionsToRole(roleName, permissions);

    res.status(200).json({
      message: 'Permissions assigned to role',
    });
  } catch (err) {
    next(err);
  }
};

export const removePermissionFromRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { roleName, permissions } = req.body;

    if (!roleName || !Array.isArray(permissions)) {
      return res.status(400).json({
        message: 'roleName and permissions[] are required',
      });
    }

    await PermissionService.removePermissionsFromRole(roleName, permissions);

    res.status(200).json({
      message: 'Permissions removed from role',
    });
  } catch (err) {
    next(err);
  }
};
