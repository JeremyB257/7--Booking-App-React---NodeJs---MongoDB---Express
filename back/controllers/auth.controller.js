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
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) return next(createError(401, 'Email/Mot de passe incorrect'));

    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordCorrect) return next(createError(401, 'Email/Mot de passe incorrect'));

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.TOKEN, { expiresIn: '24h' });

    const { password, isAdmin, ...otherDetails } = user._doc;

    res.status(200).json({ details: { ...otherDetails }, isAdmin, token });
  } catch (err) {
    next(err);
  }
};
