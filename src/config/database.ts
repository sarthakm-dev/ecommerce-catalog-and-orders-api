import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

let db: Database<sqlite3.Database, sqlite3.Statement>;

export const initDatabase = async () => {
  db = await open({
    filename: './sqlite.db',
    driver: sqlite3.Database,
  });

  await db.exec(`PRAGMA foreign_keys = ON;`);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    passwordHash TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0,
    categoryId INTEGER NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (categoryId) REFERENCES categories(id)
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    totalAmount REAL NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id)
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    orderId INTEGER NOT NULL,
    productId INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    price REAL NOT NULL,
    FOREIGN KEY (orderId) REFERENCES orders(id),
    FOREIGN KEY (productId) REFERENCES products(id)
    );
  `);
  await db.exec(`
    CREATE TABLE IF NOT EXISTS refresh_tokens (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL UNIQUE,
    token TEXT NOT NULL UNIQUE,
    expiresAt DATETIME NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id)
    ON DELETE CASCADE
  );
    `);
  await db.exec(
    `
      CREATE TABLE IF NOT EXISTS roles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      description TEXT
      );
      `,
  );
  await db.exec(
    `
      CREATE TABLE IF NOT EXISTS permissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      description TEXT
      );
      `,
  );
  await db.exec(
    `
      CREATE TABLE IF NOT EXISTS role_permissions (
      roleId INTEGER NOT NULL,
      permissionId INTEGER NOT NULL,
      PRIMARY KEY (roleId, permissionId),
      FOREIGN KEY (roleId) REFERENCES roles(id) ON DELETE CASCADE,
      FOREIGN KEY (permissionId) REFERENCES permissions(id) ON DELETE CASCADE
      );
      `,
  );
  await db.exec(
    `
      CREATE TABLE IF NOT EXISTS user_roles (
      userId INTEGER NOT NULL,
      roleId INTEGER NOT NULL,
      PRIMARY KEY (userId, roleId),
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (roleId) REFERENCES roles(id) ON DELETE CASCADE
      );
      `,
  );
  await db.exec(
    `
    INSERT OR IGNORE INTO roles (name, description) VALUES
    ('ADMIN', 'System administrator'),
    ('USER', 'Normal user');
    `,
  );
  await db.exec(
    `
    INSERT OR IGNORE INTO permissions (name, description) VALUES
    ('CREATE_PRODUCT', 'Create new products'),
    ('UPDATE_PRODUCT', 'Update product'),
    ('DELETE_PRODUCT', 'Delete product'),
    ('CREATE_CATEGORY', 'Create new category'),
    ('UPDATE_CATEGORY', 'Update category'),
    ('DELETE_CATEGORY', 'Delete category'),
    ('VIEW_CATEGORIES','View all categories'),
    ('PLACE_ORDER', 'Place an order'),
    ('VIEW_OWN_ORDER','View Own Orders'),
    ('VIEW_ALL_ORDERS', 'View all orders'),
    ('MANAGE_ROLES','Manage All roles');
    `,
  );
  await db.exec(
    `
  INSERT OR IGNORE INTO role_permissions (roleId, permissionId)
  SELECT r.id, p.id FROM roles r, permissions p
  WHERE r.name = 'ADMIN';
  `,
  );
  await db.exec(
    `
  INSERT OR IGNORE INTO role_permissions (roleId, permissionId)
  SELECT r.id, p.id FROM roles r
  JOIN permissions p ON p.name IN ('PLACE_ORDER','VIEW_OWN_ORDER','VIEW_CATEGORIES')
  WHERE r.name = 'USER';
  `,
  );
  console.log('SQLite database initialized');
};

export const getDb = () => {
  if (!db) throw new Error('Database not initialized');
  return db;
};
