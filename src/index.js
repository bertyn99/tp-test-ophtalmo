import express, { json } from 'express';
import swagger from './swagger.js';
import loadRoutes from './loaders/routes.js';

const app = express();

app.use(json());
loadRoutes(app);
swagger(app);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});