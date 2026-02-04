import { Request, Response, NextFunction } from 'express';
export const healthCheck = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json('Welcome to Ecommerce Api');
};
