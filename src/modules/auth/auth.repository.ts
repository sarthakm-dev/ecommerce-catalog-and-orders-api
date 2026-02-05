import { getDb } from '../../config/database';

export class RefreshTokenRepository {
  static async create(userId: number, token: string, expiresAt: string) {
    const db = getDb();
    await db.query(
      `INSERT INTO refresh_tokens (user_id, token, expires_at)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id)
       DO UPDATE SET token = EXCLUDED.token,expires_at = EXCLUDED.expires_at
       `,
      [userId, token, expiresAt],
    );
  }

  static async find(token: string) {
    const db = getDb();
    const { rows } = await db.query(`SELECT * FROM refresh_tokens WHERE token = $1`, [token]);
    return rows[0];
  }

  static async deleteByUserId(userId: number) {
    const db = getDb();
    await db.query(`DELETE FROM refresh_tokens WHERE user_id = $1`, [userId]);
  }
}
