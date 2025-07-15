const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Node.js API',
      version: '1.0.0',
      description: 'API documentation',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ['./index.js'], // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @openapi
 * /:
 *   get:
 *     summary: Root endpoint
 *     responses:
 *       200:
 *         description: Returns a greeting message.
 */
app.get('/', (req, res) => {
  res.send('Hello from Node.js backend!');
});


/**
 * @openapi
 * /:
 *   get:
 *     summary: Root endpoint
 *     responses:
 *       200:
 *         description: Returns a greeting message.
 */
app.get('/', (req, res) => {
  res.send('Hello from Node.js backend!');
});

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     responses:
 *       200:
 *         description: Returns server health status.
 */
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});