import { getDb } from '../../config/database';

export class PermissionRepository {
  static async userHasPermission(userId: number, permission: string): Promise<boolean> {
    const db = getDb();

    const { rows } = await db.query(
      `
      SELECT 1
      FROM user_roles ur
      JOIN role_permissions rp ON rp.role_id = ur.role_id
      JOIN permissions p ON p.id = rp.permission_id
      WHERE ur.user_id = $1
        AND p.name = $2
      LIMIT 1
      `,
      [userId, permission],
    );

    return rows.length > 0;
  }

  static async getRoleId(roleName: string) {
    const db = getDb();

    const { rows } = await db.query(`SELECT id FROM roles WHERE name = $1`, [roleName]);

    return rows[0];
  }

  static async getPermissionId(permissions: string[]) {
    const db = getDb();

    const { rows } = await db.query(
      `
      SELECT id
      FROM permissions
      WHERE name = ANY($1)
      `,
      [permissions],
    );

    return rows;
  }

  static async attachPermission(roleId: number, permissionId: number) {
    const db = getDb();

    await db.query(
      `
      INSERT INTO role_permissions (role_id, permission_id)
      VALUES ($1, $2)
      ON CONFLICT DO NOTHING
      `,
      [roleId, permissionId],
    );
  }
  static async removePermission(roleId: number, permissionId: number) {
    const db = getDb();

    const result = await db.query(
      `
    DELETE FROM role_permissions
    WHERE role_id = $1
      AND permission_id = $2
    `,
      [roleId, permissionId],
    );

    return result.rowCount;
  }
}
