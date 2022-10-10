import UserModel from '../models/user.model.js';
import fs from 'fs';

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await UserModel.find().select('-password');
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  const userObject = { ...req.body };
  delete userObject._userId;
  UserModel.findOne({ _id: req.params.id })
    .then((user) => {
      if (user._id != req.auth.userId) {
        res.status(401).json({ message: 'Not authorized' });
      } else {
        UserModel.updateOne({ _id: req.params.id }, { ...userObject, _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Profil modifié!' }))
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

export const deleteUser = async (req, res, next) => {
  UserModel.findOne({ _id: req.params.id })
    .then((user) => {
      if (user._id != req.auth.userId) {
        res.status(401).json({ message: 'Not authorized' });
      } else {
        const filename = user.picture.split('/profil/')[1];
        fs.unlink(`../front/public/uploads/profil/${filename}`, () => {
          UserModel.deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(200).json({ message: 'Profil supprimé !' });
            })
            .catch((error) => res.status(401).json({ error }));
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
      console.log(error);
    });
};
