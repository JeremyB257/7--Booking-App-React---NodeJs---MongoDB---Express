import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'You are not authentificated !' });
  }
  jwt.verify(token, process.env.TOKEN, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token is not valid !' });
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
      return res.status(401).json({ message: 'You are not authorized !' });
    }
  });
};
