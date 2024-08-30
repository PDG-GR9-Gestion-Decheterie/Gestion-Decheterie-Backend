export const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'API Documentation',
        version: '1.0.0',
        description: 'API documentation Gestion Decheterie',
      },
      servers: [
        {
          url: 'https://gestion-decheterie.internet-box.ch',
        },
      ],
    },
    apis: ['./server.js'], // Chemin vers vos fichiers de routes
  };