import { describe, it, expect } from 'vitest';
import { PermissionService } from '../../src/modules/permission/permission.service';
import { UserRepository } from '../../src/modules/user/user.repository';

describe('RoleService', () => {
  it('assigns permissions to ADMIN role', async () => {
    await PermissionService.attachPermissionsToRole('USER', ['CREATE_PRODUCT', 'VIEW_CATEGORIES']);

    const perms = await UserRepository.getRolesWithPermissions(1);
    expect(perms).toContain('CREATE_PRODUCT');
  });
});
