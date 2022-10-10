import express, { json, urlencoded } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
const app = express();
dotenv.config();

import cors from 'cors';

//Import Routes
import userRoutes from './routes/user.routes.js';
import hotelsRoute from './routes/hotel.routes.js';
import roomsRoute from './routes/room.routes.js';

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

//Use Routes
app.use('/api/user', userRoutes);
app.use('/api/hotels', hotelsRoute);
app.use('/api/rooms', roomsRoute);

export default app;
