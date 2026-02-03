import { UserRole } from "../config/constants";
export interface JwtUserpayload {
    userId: number;
    email: string;
    role: UserRole;
}