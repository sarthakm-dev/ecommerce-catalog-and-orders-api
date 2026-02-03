import bcrypt from "bcryptjs";
import { UserRepository } from "./user.repository";
import { validateCreateUser } from "./user.validation";

export class UserService {
  static async createUser(data: any) {
    validateCreateUser(data);

    const existing = await UserRepository.findByEmail(data.email);
    if (existing) {
      throw new Error("Email already exists");
    }

    const passwordHash = await bcrypt.hash(data.password, 10);
    return UserRepository.create(data.name, data.email, passwordHash);
  }

  static async getProfile(userId: number) {
    return UserRepository.findById(userId);
  }

  static async deleteMe(userId: number) {
    const user = await UserRepository.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    await UserRepository.deleteById(userId);
  }
}