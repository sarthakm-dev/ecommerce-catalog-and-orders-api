import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = await AuthService.login(req.body);
    res.json({ accessToken: token });
  } catch (err) {
    next(err);
  }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.body;
    const accessToken = await AuthService.refresh(refreshToken);
    res.json({ accessToken });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.body;
    console.log('Refresh Token', req.body);
    await AuthService.logout(refreshToken);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
