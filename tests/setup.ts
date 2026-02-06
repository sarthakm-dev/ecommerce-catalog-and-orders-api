import { beforeAll, afterAll } from 'vitest';
import { initDatabase, getDb } from '../src/config/database';
import dotenv from 'dotenv';

beforeAll(async () => {
  dotenv.config({ path: '.env.test' });
  console.log('DATABASE_URL', process.env.DATABASE_URL);
  await initDatabase();
});

afterAll(async () => {
  await getDb().end();
});
