import express, { json, urlencoded } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
const app = express();
dotenv.config();

import cors from 'cors';

//Import Routes
import userRoutes from './routes/user.routes.js';
import hotelsRoute from './routes/hotel.routes.js';

import { verifyToken } from './middleware/auth.middleware.js';
// connect to MongoDb
mongoose
  .connect(
    'mongodb+srv://' +
      process.env.DB_CONNECT +
      '@cluster0.devgshf.mongodb.net/' +
      process.env.DB_NAME +
      '?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//Middleware
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.get('/jwtid', verifyToken, (req, res) => {
  res.status(200).send(res.locals.user);
});
//Use Routes
app.use('/api/user', userRoutes);
app.use('/api/hotel', hotelsRoute);

export default app;
