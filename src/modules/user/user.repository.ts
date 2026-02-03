import { getDb } from "../../config/database";

export class UserRepository {
  static async create(name: string, email: string, passwordHash: string) {
    const db = getDb();
    const result = await db.run(
      `INSERT INTO users (name, email, passwordHash)
       VALUES (?, ?, ?)`,
      [name, email, passwordHash]
    );
    return result.lastID;
  }

  static async findByEmail(email: string) {
    const db = getDb();
    return db.get(
      `SELECT * FROM users WHERE email = ?`,
      [email]
    );
  }

  static async findById(id: number) {
    const db = getDb();
    return db.get(
      `SELECT id, name, email, role, createdAt
       FROM users
       WHERE id = ?`,
      [id]
    );
  }

  static async deleteById(id: number) {
    const db = getDb();
    await db.run(
      `DELETE FROM users WHERE id = ?`,
      [id]
    );
  }
}