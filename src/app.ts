import express from 'express';
import cors from 'cors';
import { registerRoutes } from './routes';
import { errorMiddleware } from './middlewares/error.middleware';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import helmet from 'helmet';
import { limiter } from './config/limiter';
import { options } from './config/swagger-options';

const app = express();

app.use(limiter);
app.use(helmet());
app.use(cors());
app.use(express.json());
const swaggerSpec = swaggerJSDoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
registerRoutes(app);
app.use(errorMiddleware);

export default app;
