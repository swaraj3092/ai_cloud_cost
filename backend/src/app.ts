import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/api';

const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.send('AI Cloud Cost Optimization Backend API');
});

export default app;
