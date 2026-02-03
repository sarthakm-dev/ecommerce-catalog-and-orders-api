import { Request, Response, NextFunction } from 'express';
import { OrderService } from './order.service';

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.userId;
    const orderId = await OrderService.createOrder(userId, req.body);
    res.status(201).json({ id: orderId });
  } catch (err) {
    next(err);
  }
};

export const getOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await OrderService.getOrder(Number(req.params.id));
    res.json(order);
  } catch (err) {
    next(err);
  }
};
