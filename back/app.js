import express, { json, urlencoded } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import { requireAuth, checkUser } from './middleware/auth.middleware';
const app = express();
require('dotenv').config();

app.use(json());
app.use(urlencoded({ extended: true }));

import userRoutes from './routes/user.routes';
import postRoutes from './routes/post.routes';

connect(
  'mongodb+srv://' +
    process.env.DB_CONNECT +
    '@cluster0.devgshf.mongodb.net/' +
    process.env.DB_NAME +
    '?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(cors());

app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});

app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

export default app;
