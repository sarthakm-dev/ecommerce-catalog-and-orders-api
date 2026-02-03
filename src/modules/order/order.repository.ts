import { getDb } from '../../config/database';

export class OrderRepository {
  static async create(userId: number, totalAmount: number) {
    const db = getDb();
    const result = await db.run(
      `INSERT INTO orders (userId, totalAmount)
       VALUES (?, ?)`,
      [userId, totalAmount],
    );
    return result.lastID;
  }

  static async findById(orderId: number) {
    const db = getDb();
    return db.get(
      `SELECT id, userId, totalAmount, createdAt
       FROM orders WHERE id = ?`,
      [orderId],
    );
  }
}
