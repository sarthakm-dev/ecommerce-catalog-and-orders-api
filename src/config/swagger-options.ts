import { swaggerDefinition } from './swagger-definition';

export const options = {
  swaggerDefinition,
  apis: ['./src/modules/**/*.routes.ts', './api.ts'],
};
