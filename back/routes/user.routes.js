import { Router } from 'express';
const router = Router();

import { verifyUser } from '../middleware/auth.middleware.js';
import { register, login } from '../controllers/auth.controller.js';
import { getAllUsers, getUser, updateUser, deleteUser } from '../controllers/user.controller.js';

// auth
router.post('/register', register);
router.post('/login', login);

// user DB
router.get('/', getAllUsers);
router.get('/:id', verifyUser, getUser);
router.put('/:id', verifyUser, updateUser);
router.delete('/:id', verifyUser, deleteUser);

export default router;
