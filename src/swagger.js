import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';


const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Cobaye et User API',
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
      },
    },
  },
  apis: ['./src/components/cobaye/*.js', './src/components/user/*.js'], // Ajustez les chemins pour inclure vos fichiers de route
};

const specs = swaggerJsdoc(options);

function setupDocSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}



export default setupDocSwagger;