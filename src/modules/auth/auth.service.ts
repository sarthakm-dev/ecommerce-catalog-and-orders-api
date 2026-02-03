import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../../config/env";
import { UserRepository } from "../user/user.repository";

export class AuthService {
  static async login(data: any) {
    const { email, password } = data;
    
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const user = await UserRepository.findByEmail(email);
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role ?? "USER"
      },
      env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    return token;
  }
}