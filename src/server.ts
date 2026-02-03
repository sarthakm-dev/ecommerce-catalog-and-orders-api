import app from "./app";
import { initDatabase } from "./config/database";
import { env } from "./config/env";

const startServer = async () => {
  await initDatabase();

  app.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT}`);
  });
};

startServer();