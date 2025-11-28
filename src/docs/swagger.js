const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API RESTful - Projeto',
      version: '1.0.0',
      description: 'API para gerenciamento de usuários, produtos e tarefas com autenticação JWT',
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
        description: 'Servidor local (API v1)',
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
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/routes/*.js', './src/models/*.js'],
};

const swaggerSpec = swaggerJsDoc(options);

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Lista todos os usuários
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários
 *
 * /usuarios/{id}:
 *   get:
 *     summary: Retorna um usuário pelo ID
 *     security:
 *       - bearerAuth: []
 *   put:
 *     summary: Atualiza os dados de um usuário
 *     security:
 *       - bearerAuth: []
 *   delete:
 *     summary: Remove um usuário
 *     security:
 *       - bearerAuth: []
 */