import { getDb } from '../../config/database';

export class ProductRepository {
  static async create(name: string, price: number, stock: number, categoryId: number) {
    const db = getDb();

    const { rows } = await db.query(
      `
      INSERT INTO products (name, price, stock, category_id)
      VALUES ($1, $2, $3, $4)
      RETURNING id
      `,
      [name, price, stock, categoryId],
    );

    return rows[0].id;
  }

  static async findAll() {
    const db = getDb();

    const { rows } = await db.query(
      `
      SELECT
        p.id,
        p.name,
        p.price,
        p.stock,
        p.category_id,
        p.created_at,
        c.name AS category_name
      FROM products p
      JOIN categories c ON c.id = p.category_id
      `,
    );

    return rows;
  }

  static async findById(id: number) {
    const db = getDb();

    const { rows } = await db.query(
      `
      SELECT
        p.id,
        p.name,
        p.price,
        p.stock,
        p.category_id,
        p.created_at,
        c.name AS category_name
      FROM products p
      JOIN categories c ON c.id = p.category_id
      WHERE p.id = $1
      `,
      [id],
    );

    return rows[0];
  }

  static async update(id: number, name: string, stock: number, price: number) {
    const db = getDb();

    const result = await db.query(
      `
      UPDATE products
      SET name = $1,
          price = $2,
          stock = $3
      WHERE id = $4
      `,
      [name, price, stock, id],
    );

    return result.rowCount;
  }

  static async deleteById(id: number) {
    const db = getDb();

    await db.query(`DELETE FROM products WHERE id = $1`, [id]);
  }

  static async reduceStock(productId: number, quantity: number) {
    const db = getDb();

    const result = await db.query(
      `
      UPDATE products
      SET stock = stock - $1
      WHERE id = $2
        AND stock >= $1
      `,
      [quantity, productId],
    );

    return result.rowCount; // 1 = success, 0 = insufficient stock
  }
}
