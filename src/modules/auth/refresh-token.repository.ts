import { getDb } from '../../config/database';

export class RefreshTokenRepository {
  static async create(userId: number, token: string, expiresAt: string) {
    const db = getDb();
    await db.run(
      `INSERT INTO refresh_tokens (userId, token, expiresAt)
       VALUES (?, ?, ?)`,
      [userId, token, expiresAt],
    );
  }

  static async find(token: string) {
    const db = getDb();
    return db.get(`SELECT * FROM refresh_tokens WHERE token = ?`, [token]);
  }

  static async deleteByUserId(userId: number) {
    const db = getDb();
    await db.run(`DELETE FROM refresh_tokens WHERE userId = ?`, [userId]);
  }
}
