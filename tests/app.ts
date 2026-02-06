import express from 'express';
import { registerRoutes } from '../src/routes';

export const createTestApp = () => {
  const app = express();
  app.use(express.json());
  registerRoutes(app);
  return app;
};
