import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Cobaye, User et Session API',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Mettez à jour l'URL de votre serveur
      },
    ],
    components: {
      schemas: {
        Cobaye: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'objectId',
            },
            nom: {
              type: 'string',
            },
            prenom: {
              type: 'string',
            },
            date_de_naissance: {
              type: 'string',
              format: 'date-time',
            },
            sexe: {
              type: 'string',
            },
            userID: {
              type: 'string',
              format: 'objectId',
            },
          },
          required: ['id', 'nom', 'prenom', 'date_de_naissance', 'sexe', 'userID'],
        },
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'objectId',
            },
            email: {
              type: 'string',
            },
            password: {
              type: 'string',
            },
            cobaye: {
              $ref: '#/components/schemas/Cobaye',
            },
          },
        },
        Session: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'objectId',
            },
            startTime: {
              type: 'string',
              format: 'date-time',
            },
            endTime: {
              type: 'string',
              format: 'date-time',
            },
            pauses: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  start: {
                    type: 'string',
                    format: 'date-time',
                  },
                  end: {
                    type: 'string',
                    format: 'date-time',
                  },
                },
              },
            },
            userID: {
              type: 'string',
              format: 'objectId',
            },
          },
          required: ['id', 'startTime', 'endTime', 'pauses', 'userID'],
        },
      },
    },
  },
  apis: [
    './src/components/cobaye/*.js',
    './src/components/user/*.js',
    './src/components/session/*.js', // Ajoutez le chemin pour inclure les fichiers de route de session
  ],
};

const specs = swaggerJsdoc(options);

function setupDocSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}

export default setupDocSwagger;