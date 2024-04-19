import express from 'express';
import swagger from './swagger.js';
import loadRoutes from './loaders/routes.js';

const app = express();

loadRoutes(app);
swagger(app);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});