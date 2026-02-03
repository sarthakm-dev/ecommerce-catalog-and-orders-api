import { UserRole } from "../config/constants";

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: number;
        email: string;
        role: UserRole;
      };
    }
  }
}

export {};