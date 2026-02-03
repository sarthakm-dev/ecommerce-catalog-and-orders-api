import bcrypt from "bcryptjs";
import { UserRepository } from "./user.repository";
import { validateCreateUser } from "./user.validation";
import { CategoryRepository } from "../category/category.repository";

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

  static async updateName(data:any, id:number){
    const name = data.name;
    if(!name){
      throw new Error("User name is required");
    }
    const updated = await UserRepository.updateName(id,name);
    if(updated===0){
        throw new Error("User not found")
    }
  }
}