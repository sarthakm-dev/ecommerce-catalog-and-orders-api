export const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Ecommerce Catalogue And Orders API',
    version: '1.0.0',
    description: 'This is a REST API application made with Express',
  },
  servers: [
    {
      url: `http://localhost:8000`,
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};
