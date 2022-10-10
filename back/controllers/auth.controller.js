import UserModel from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { signUpErrors, createError } from '../utils/errors.utils.js';

export const register = async (req, res, next) => {
  const { pseudo, email, password } = req.body;

  try {
    const user = await UserModel.create({ pseudo, email, password });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = signUpErrors(err);
    res.status(400).send({ errors });
  }
};

export const login = async (req, res, next) => {
  try {
    const user = UserModel.findOne({ email: req.body.email });
    if (!user) return next(createError(401, 'Email/Mot de passe incorrect'));

    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordCorrect) return next(createError(401, 'Email/Mot de passe incorrect'));

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.TOKEN, {
      expiresIn: '24h',
    });
    res.status(200).json({
      token: token,
    });
  } catch (err) {
    next(err);
  }
  UserModel.findOne({ email: req.body.email })
    .then((user) => {
      if (user === null) {
        return res.status(401).json({ message: 'email/mot de passe incorrect' });
      } else {
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              return res.status(401).json({ message: 'email/mot de passe incorrect' });
            } else {
              const token = jwt.sign({ userId: user._id }, process.env.TOKEN, {
                expiresIn: '24h',
              });
              res.status(200).json({
                token: token,
              });
            }
          })
          .catch((error) => res.status(500).json({ error }));
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
