import request from 'supertest';
import { describe, it, expect } from 'vitest';
import { createTestApp } from '../app';

const app = createTestApp();

describe('Auth API (Postgres)', () => {
  it('registers and logs in user', async () => {
    await request(app).post('/api/auth/register').send({
      name: 'Test User',
      email: 'test@test.com',
      password: 'password123',
    });

    const res = await request(app).post('/api/auth/login').send({
      email: 'test@test.com',
      password: 'password123',
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('accessToken');
    expect(res.body).toHaveProperty('refreshToken');
  });
});
