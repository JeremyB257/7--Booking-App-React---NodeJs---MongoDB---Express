import jwt from 'jsonwebtoken';
import { createError } from '../../api/utils/error.js';

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    return next(createError(401, 'You are not authentificated !'));
  }
  jwt.verify(token, process.env.TOKEN, (err, user) => {
    if (err) return next(createError(403, 'Token is not valid !'));
    req.user = user;
    res.locals.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, 'You are not authorized !'));
    }
  });
};
