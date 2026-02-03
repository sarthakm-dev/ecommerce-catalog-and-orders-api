import { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = await AuthService.login(req.body);
    res.json({ accessToken: token });
  } catch (err) {
    next(err);
  }
};