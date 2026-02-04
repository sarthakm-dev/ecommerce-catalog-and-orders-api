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
    console.log(req.user);
    await UserService.updateName(req.body, Number(req.user?.userId));
    res.status(200).json({ message: 'Name Updated Successfully' });
  } catch (err) {
    next(err);
  }
};

export const updatePrivillege = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const { role } = req.body;
    if (!['ADMIN', 'USER'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }
    await UserService.updateUserRole(id, role);
    res.status(200).json({ message: 'Role updated' });
  } catch (err) {
    next(err);
  }
};
