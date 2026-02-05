import express from 'express';
import cors from 'cors';
import { registerRoutes } from './routes';
import { errorMiddleware } from './middlewares/error.middleware';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import helmet from 'helmet';
import { rateLimiter } from './config/rate-limiter';
import { options } from './config/swagger-options';
import { healthCheck } from './modules/health/health.service';

const app = express();

app.use(helmet());
app.use(rateLimiter);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const swaggerSpec = swaggerJSDoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/', healthCheck);
registerRoutes(app);
app.use(errorMiddleware);

export default app;
