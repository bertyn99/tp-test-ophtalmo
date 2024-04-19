import express from 'express';
import sessionRoutes from './components/session/session.js';
import swagger from './swagger.js';

const app = express();

app.use(express.json());
app.use('/api/sessions', sessionRoutes);

swagger(app);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});