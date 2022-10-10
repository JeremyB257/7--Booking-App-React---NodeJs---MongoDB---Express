import UserModel from '../models/user.model.js';
import fs from 'fs';

export function getAllUsers(req, res) {
  UserModel.find()
    .select('-password')
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(404).json({ error }));
}

export function getUser(req, res) {
  UserModel.findOne({ _id: req.params.id })
    .select('-password')
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(404).json({ error }));
}

export function updateUser(req, res) {
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
}

export function deleteUser(req, res) {
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
}
