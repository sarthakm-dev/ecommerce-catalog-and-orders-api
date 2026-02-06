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

  static async getRoleId(roleName: string) {
    const db = getDb();
    const response = await db.get(
      `
      SELECT id FROM roles WHERE name = ?
    `,
      [roleName],
    );
    return response;
  }

  static async getPermissionId(permissions: string[]) {
    const db = getDb();
    const placeholder = permissions.map(() => '?').join(', ');
    const query = `SELECT id FROM permissions WHERE name IN (${placeholder})`;
    const response = await db.all(query, ...permissions);
    return response;
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

  static async removePermission(roleId: number, permissionId: number) {
    const db = getDb();

    const result = await db.run(
      `
    DELETE FROM role_permissions
    WHERE roleId = $1
    AND permissionId = $2
    `,
      [roleId, permissionId],
    );

    return result.changes;
  }
}
