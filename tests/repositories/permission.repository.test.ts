import { describe, it, expect } from 'vitest';
import { PermissionRepository } from '../../src/modules/permission/permission.repository';

describe('PermissionRepository', () => {
  it('returns permission IDs from names', async () => {
    const result = await PermissionRepository.getPermissionId([
      'CREATE_PRODUCT',
      'VIEW_CATEGORIES',
    ]);

    expect(result.length).toBe(2);
    expect(result[0]).toHaveProperty('id');
  });
});
