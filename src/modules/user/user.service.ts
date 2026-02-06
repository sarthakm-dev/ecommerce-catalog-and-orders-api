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
    const id = await UserRepository.create(data.name, data.email, passwordHash);
    await UserRepository.assign(id, 2);
    return id;
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

  static async getUserRoles(userId: number) {
    const rows = await UserRepository.getRolesWithPermissions(userId);
    if (!rows) {
      throw new Error('Cant Find Permissions for this user');
    }
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
  static async assignRole(emailId: string, roleName: string) {
    const user = await UserRepository.findByEmail(emailId);
    if (!user) {
      throw new Error('User not found');
    }
    const userId = user.id;
    const role = await PermissionRepository.getRoleId(roleName);
    if (!role) {
      throw new Error('Role not found');
    }
    const roleId = Number(role.id);

    await UserRepository.clearRoles(userId);

    await UserRepository.assign(userId, roleId);
  }
}
