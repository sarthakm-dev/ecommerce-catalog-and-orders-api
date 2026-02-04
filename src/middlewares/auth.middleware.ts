import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { Request, Response, NextFunction } from 'express';
import { JwtUserpayload } from '../types/payload';
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const parts = authHeader.split(' ');

  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const token = parts[1];
  try {
    req.user = jwt.verify(token, env.JWT_SECRET) as JwtUserpayload;
    console.log(req.user);
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const requiredRole = (role: 'ADMIN' | 'USER') => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    if (req.user?.role !== role) {
      console.log(req.user.role);
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
};
