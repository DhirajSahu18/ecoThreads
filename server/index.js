import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import requestRoutes from './routes/request.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/requests', requestRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(8080, () => console.log('Server running on port 8080'));
  })
  .catch(err => console.error(err));
