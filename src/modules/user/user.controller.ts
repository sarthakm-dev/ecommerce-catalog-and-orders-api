import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { Request, Response, NextFunction } from 'express';
export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = await UserService.createUser(req.body);
    res.status(201).json({ userId });
  } catch (err) {
    next(err);
  }
};

export const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const user = await UserService.getProfile(req.user.userId);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const deleteMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    await UserService.deleteMe(req.user.userId);
    res.status(204).send('Record Successfully deleted');
  } catch (err) {
    next(err);
  }
};

export const updateName = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await UserService.updateName(req.body, Number(req.user?.userId));
    res.status(200).json({ message: 'Name Updated Successfully' });
  } catch (err) {
    next(err);
  }
};

export const assignRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = Number(req.params.id);
    const roleId = parseInt(req.body.roleId, 10);
    console.log('raw body', req.body);
    console.log('roleId', roleId);
    if (!userId || !roleId) {
      return res.status(400).json({ message: 'userId and roleId are required' });
    }

    await UserRepository.clearRoles(userId);

    await UserRepository.assign(userId, roleId);

    res.json({ message: 'Role assigned successfully' });
  } catch (err) {
    next(err);
  }
};

export const getUserRoles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = Number(req.params.id);

    if (!userId) {
      return res.status(400).json({ message: 'Invalid userId' });
    }

    const rows = await UserRepository.getRolesWithPermissions(userId);

    const roleMap: Record<number, any> = {};

    for (const row of rows) {
      if (!roleMap[row.roleId]) {
        roleMap[row.roleId] = {
          id: row.roleId,
          name: row.roleName,
          permissions: [],
        };
      }

      roleMap[row.roleId].permissions.push(row.permission);
    }

    res.json({
      userId,
      roles: Object.values(roleMap),
    });
  } catch (err) {
    next(err);
  }
};
