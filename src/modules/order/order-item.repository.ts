import { getDb } from '../../config/database';

export class OrderItemRepository {
  static async create(orderId: number, productId: number, quantity: number, price: number) {
    const db = getDb();
    await db.run(
      `INSERT INTO order_items (orderId, productId, quantity, price)
       VALUES (?, ?, ?, ?)`,
      [orderId, productId, quantity, price],
    );
  }

  static async findByOrderId(orderId: number) {
    const db = getDb();
    return db.all(
      `SELECT oi.id, oi.productId, p.name as productName,
              oi.quantity, oi.price
       FROM order_items oi
       JOIN products p ON p.id = oi.productId
       WHERE oi.orderId = ?`,
      [orderId],
    );
  }
}
