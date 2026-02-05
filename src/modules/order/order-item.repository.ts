import { getDb } from '../../config/database';

export class OrderItemRepository {
  static async create(orderId: number, productId: number, quantity: number, price: number) {
    const db = getDb();

    await db.query(
      `
      INSERT INTO order_items (order_id, product_id, quantity, price)
      VALUES ($1, $2, $3, $4)
      `,
      [orderId, productId, quantity, price],
    );
  }

  static async findByOrderId(orderId: number) {
    const db = getDb();

    const { rows } = await db.query(
      `
      SELECT
        oi.id,
        oi.product_id,
        p.name AS product_name,
        oi.quantity,
        oi.price
      FROM order_items oi
      JOIN products p ON p.id = oi.product_id
      WHERE oi.order_id = $1
      `,
      [orderId],
    );

    return rows;
  }
}
