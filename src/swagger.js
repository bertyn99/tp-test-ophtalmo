import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi, { setup } from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Cobaye API',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3000',
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
      },
    },
  },
  apis: ['./src/components/cobaye/*.js'], // Mettez à jour le chemin pour inclure vos fichiers de route
};



const specs = swaggerJsdoc(options);

function setupDocSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}



export default setupDocSwagger;