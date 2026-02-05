import app from './app';
import { initDatabase } from './config/database';
import { env } from './config/env';

const startServer = async () => {
  await initDatabase();

  app.listen(3000, '0.0.0.0', () => {
    console.log(`Server running on port 3000`);
  });
};

startServer();
