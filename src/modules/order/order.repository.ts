import { getDb } from '../../config/database';

export class OrderRepository {
  static async create(userId: number, totalAmount: number) {
    const db = getDb();

    const { rows } = await db.query(
      `
      INSERT INTO orders (user_id, total_amount)
      VALUES ($1, $2)
      RETURNING id
      `,
      [userId, totalAmount],
    );

    return rows[0].id;
  }

  static async findById(orderId: number) {
    const db = getDb();

    const { rows } = await db.query(
      `
      SELECT id, user_id, total_amount, created_at
      FROM orders
      WHERE id = $1
      `,
      [orderId],
    );

    return rows[0];
  }
}
