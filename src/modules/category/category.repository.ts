import { getDb } from '../../config/database';

export class CategoryRepository {
  static async create(name: string) {
    const db = getDb();

    const { rows } = await db.query(
      `
      INSERT INTO categories (name)
      VALUES ($1)
      RETURNING id
      `,
      [name],
    );

    return rows[0].id;
  }

  static async findAll() {
    const db = getDb();

    const { rows } = await db.query(`SELECT id, name, created_at FROM categories`);

    return rows;
  }

  static async findById(id: number) {
    const db = getDb();

    const { rows } = await db.query(`SELECT id, name, created_at FROM categories WHERE id = $1`, [
      id,
    ]);

    return rows[0];
  }

  static async deleteById(id: number) {
    const db = getDb();

    await db.query(`DELETE FROM categories WHERE id = $1`, [id]);
  }

  static async updateName(id: number, name: string) {
    const db = getDb();

    const result = await db.query(`UPDATE categories SET name = $1 WHERE id = $2`, [name, id]);

    return result.rowCount;
  }
}
