import { getDb } from '../../config/database';

export class ProductRepository {
  static async create(name: string, price: number, stock: number, categoryId: number) {
    const db = getDb();
    const result = await db.run(
      `INSERT INTO products (name, price, stock, categoryId)
       VALUES (?, ?,?, ?)`,
      [name, price, stock, categoryId],
    );
    return result.lastID;
  }

  static async findAll() {
    const db = getDb();
    return db.all(
      `SELECT p.id, p.name, p.price, p.stock, p.categoryId, p.createdAt,
              c.name as categoryName
       FROM products p
       JOIN categories c ON c.id = p.categoryId`,
    );
  }

  static async findById(id: number) {
    const db = getDb();
    return db.get(
      `SELECT p.id, p.name, p.price, p.stock, p.categoryId, p.createdAt,
              c.name as categoryName
       FROM products p
       JOIN categories c ON c.id = p.categoryId
       WHERE p.id = ?`,
      [id],
    );
  }

  static async update(id: number, name: string, stock: number, price: number) {
    const db = getDb();
    const result = await db.run(`UPDATE products SET name = ?, price = ?, stock = ? WHERE id = ?`, [
      name,
      price,
      stock,
      id,
    ]);
    return result.changes;
  }

  static async deleteById(id: number) {
    const db = getDb();
    await db.run(`DELETE FROM products WHERE id = ?`, [id]);
  }

  static async reduceStock(productId: number, quantity: number) {
    const db = getDb();

    const result = await db.run(
      `
    UPDATE products
    SET stock = stock - ?
    WHERE id = ? AND stock >= ?
    `,
      [quantity, productId, quantity],
    );

    return result.changes;
  }
}
