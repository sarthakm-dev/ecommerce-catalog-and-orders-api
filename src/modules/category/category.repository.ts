import { getDb } from "../../config/database";

export class CategoryRepository {
  static async create(name: string) {
    const db = getDb();
    const result = await db.run(`INSERT INTO categories (name) VALUES (?)`, [
      name,
    ]);
    return result.lastID;
  }

  static async findAll() {
    const db = getDb();
    return db.all(`SELECT id, name, createdAt FROM categories`);
  }

  static async findById(id: number) {
    const db = getDb();
    return db.get(`SELECT id, name, createdAt FROM categories WHERE id = ?`, [
      id,
    ]);
  }

  static async deleteById(id: number) {
    const db = getDb();
    await db.run(`DELETE FROM categories WHERE id = ?`, [id]);
  }
  static async updateName(id: number, name: string) {
    const db = getDb();
    const result = await db.run(`UPDATE categories SET name = ? WHERE id = ?`, [
      name,
      id,
    ]);
    return result.changes;
  }
}
