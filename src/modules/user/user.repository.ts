import { getDb } from '../../config/database';

export class UserRepository {
  static async create(name: string, email: string, passwordHash: string) {
    const db = getDb();
    const result = await db.run(
      `INSERT INTO users (name, email, passwordHash)
       VALUES (?, ?, ?)`,
      [name, email, passwordHash],
    );
    return result.lastID;
  }

  static async findByEmail(email: string) {
    const db = getDb();
    return db.get(`SELECT * FROM users WHERE email = ?`, [email]);
  }

  static async findById(id: number) {
    const db = getDb();
    return db.get(
      `SELECT id, name, email,createdAt
       FROM users
       WHERE id = ?`,
      [id],
    );
  }

  static async deleteById(id: number) {
    const db = getDb();
    await db.run(`DELETE FROM users WHERE id = ?`, [id]);
  }

  static async updateName(id: number, name: string) {
    const db = getDb();
    const updated = await db.run(`UPDATE users SET name = ? WHERE id = ?`, [name, id]);
    return updated.changes;
  }

  static async clearRoles(userId: number) {
    const db = getDb();
    await db.run(`DELETE FROM user_roles WHERE userId = ?`, [userId]);
  }
  static async assign(userId: number, roleId: number) {
    const db = getDb();
    await db.run(
      `
      INSERT OR IGNORE INTO user_roles (userId,roleId)
      VALUES (?, ?)
      `,
      [userId, roleId],
    );
  }

  static async getRoles(userId: number) {
    const db = getDb();

    return db.all(
      `
    SELECT
      r.id   AS roleId,
      r.name AS roleName
    FROM user_roles ur
    JOIN roles r ON r.id = ur.roleId
    WHERE ur.userId = ?
    `,
      [userId],
    );
  }
  static async getRolesWithPermissions(userId: number) {
    const db = getDb();

    return db.all(
      `
    SELECT
      r.id   AS roleId,
      r.name AS roleName,
      p.name AS permission
      FROM user_roles ur
      JOIN roles r ON r.id = ur.roleId
      JOIN role_permissions rp ON rp.roleId = r.id
      JOIN permissions p ON p.id = rp.permissionId
      WHERE ur.userId = ?
    `,
      [userId],
    );
  }
}
