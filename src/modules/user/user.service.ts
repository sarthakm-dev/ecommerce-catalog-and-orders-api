import bcrypt from 'bcryptjs';
import { UserRepository } from './user.repository';
import { validateCreateUser } from './user.validation';
import { PermissionRepository } from '../permission/permission.repository';

export class UserService {
  static async createUser(data: any) {
    validateCreateUser(data);

    const existing = await UserRepository.findByEmail(data.email);
    if (existing) {
      throw new Error('Email already exists');
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const userId = await UserRepository.create(data.name, data.email, passwordHash);
    if (!userId) {
      throw new Error('Unable to register user');
    }
    await UserRepository.assign(userId, 2);
    return userId;
  }

  static async getProfile(userId: number) {
    return UserRepository.findById(userId);
  }

  static async deleteMe(userId: number) {
    const user = await UserRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    await UserRepository.deleteById(userId);
  }

  static async updateName(data: any, id: number) {
    const name = data.name;
    if (!name) {
      throw new Error('User name is required');
    }
    const updated = await UserRepository.updateName(id, name);
    if (updated === 0) {
      throw new Error('User not found');
    }
  }

  static async assignRole(emailId: string, roleName: string) {
    if (!emailId || !roleName) {
      throw new Error('emaiId and roleName are required fields');
    }
    const user = await UserRepository.findByEmail(emailId);
    if (!user) {
      throw new Error('Unable to find userId');
    }
    const userId = user.id;
    const role = await PermissionRepository.getRoleId(roleName);
    if (!role) {
      throw new Error('Unable to find roleId');
    }
    const roleId = Number(role.id);

    await UserRepository.clearRoles(userId);

    await UserRepository.assign(userId, roleId);
  }

  static async getUserRoles(userId: number) {
    const rows = await UserRepository.getRolesWithPermissions(userId);

    const roleMap: Record<number, any> = {};

    for (const row of rows) {
      if (!roleMap[row.roleId]) {
        roleMap[row.roleId] = {
          id: row.roleId,
          name: row.roleName,
          permissions: [],
        };
      }

      roleMap[row.roleId].permissions.push(row.permission);
    }
    return roleMap;
  }
}
