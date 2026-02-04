import { UserRole } from './role';
export interface JwtUserpayload {
  userId: number;
  email: string;
  role: UserRole;
}
