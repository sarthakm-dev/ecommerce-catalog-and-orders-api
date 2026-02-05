import { getDb } from '../../config/database';

export class PermissionRepository {
  static async userHasPermission(userId: number, permission: string): Promise<boolean> {
    const db = getDb();

    const result = await db.get(
      `
      SELECT 1
      FROM user_roles ur
      JOIN role_permissions rp ON rp.roleId = ur.roleId
      JOIN permissions p ON p.id = rp.permissionId
      WHERE ur.userId = ? AND p.name = ?
      LIMIT 1
      `,
      [userId, permission],
    );

    return !!result;
  }
  static async attachPermission(roleId: number, permissionId: number) {
    const db = getDb();

    await db.run(
      `
    INSERT OR IGNORE INTO role_permissions (roleId,permissionId)
    VALUES (?, ?)
    `,
      [roleId, permissionId],
    );
  }
}
