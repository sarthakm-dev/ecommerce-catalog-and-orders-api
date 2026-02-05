import { getDb } from '../../config/database';

export class UserRepository {
  static async create(name: string, email: string, passwordHash: string) {
    const db = getDb();

    const { rows } = await db.query(
      `
      INSERT INTO users (name, email, password_hash)
      VALUES ($1, $2, $3)
      RETURNING id
      `,
      [name, email, passwordHash],
    );

    return rows[0].id;
  }

  static async findByEmail(email: string) {
    const db = getDb();

    const { rows } = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);

    return rows[0];
  }

  static async findById(id: number) {
    const db = getDb();

    const { rows } = await db.query(
      `
      SELECT id, name, email, created_at
      FROM users
      WHERE id = $1
      `,
      [id],
    );

    return rows[0];
  }

  static async deleteById(id: number) {
    const db = getDb();

    await db.query(`DELETE FROM users WHERE id = $1`, [id]);
  }

  static async updateName(id: number, name: string) {
    const db = getDb();

    const result = await db.query(`UPDATE users SET name = $1 WHERE id = $2`, [name, id]);

    return result.rowCount;
  }

  static async clearRoles(userId: number) {
    const db = getDb();

    await db.query(`DELETE FROM user_roles WHERE user_id = $1`, [userId]);
  }

  static async assign(userId: number, roleId: number) {
    const db = getDb();

    await db.query(
      `
      INSERT INTO user_roles (user_id, role_id)
      VALUES ($1, $2)
      ON CONFLICT DO NOTHING
      `,
      [userId, roleId],
    );
  }

  static async getRoles(userId: number) {
    const db = getDb();

    const { rows } = await db.query(
      `
      SELECT
        r.id   AS role_id,
        r.name AS role_name
      FROM user_roles ur
      JOIN roles r ON r.id = ur.role_id
      WHERE ur.user_id = $1
      `,
      [userId],
    );

    return rows;
  }

  static async getRolesWithPermissions(userId: number) {
    const db = getDb();

    const { rows } = await db.query(
      `
      SELECT
        r.id   AS role_id,
        r.name AS role_name,
        p.name AS permission
      FROM user_roles ur
      JOIN roles r ON r.id = ur.role_id
      LEFT JOIN role_permissions rp ON rp.role_id = r.id
      LEFT JOIN permissions p ON p.id = rp.permission_id
      WHERE ur.user_id = $1
      `,
      [userId],
    );

    return rows;
  }
}
