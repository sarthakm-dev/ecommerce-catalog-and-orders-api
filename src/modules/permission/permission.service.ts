import { PermissionRepository } from './permission.repository';

export class PermissionService {
  static async attachPermissionsToRole(roleName: string, permissions: string[]) {
    const role = await PermissionRepository.getRoleId(roleName);
    if (!role) {
      throw new Error('Role not found');
    }

    const permissionIds = await PermissionRepository.getPermissionId(permissions);

    for (const { id } of permissionIds) {
      await PermissionRepository.attachPermission(role.id, id);
    }
  }

  static async removePermissionsFromRole(roleName: string, permissions: string[]) {
    const role = await PermissionRepository.getRoleId(roleName);
    if (!role) throw new Error('Role not found');

    const permissionIds = await PermissionRepository.getPermissionId(permissions);

    for (const { id } of permissionIds) {
      await PermissionRepository.removePermission(role.id, id);
    }
  }
}
