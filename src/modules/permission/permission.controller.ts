import { Request, Response, NextFunction } from 'express';
import { PermissionRepository } from './permission.repository';

export const attachPermissionToRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const roleId = Number(req.params.id);
    const { permissionId } = req.body;
    if (!permissionId) {
      return res.status(400).json({ message: 'permissionId is required' });
    }
    await PermissionRepository.attachPermission(roleId, permissionId);
    res.json({ message: 'Role Assigned' });
  } catch (err) {
    next(err);
  }
};
