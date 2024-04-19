import express from 'express';
import sessionRoutes from './routes/sessionRoutes.js';

const app = express();

app.use(express.json());
app.use('/api/sessions', sessionRoutes);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});