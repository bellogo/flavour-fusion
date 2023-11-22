// swaggerConfig.js
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Flavor Fusion API',
    version: '1.0.0',
    description: 'API documentation for the Recipe Management system',
  },
  basePath: '/',
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js'], // Path to the API routes you want to document
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
