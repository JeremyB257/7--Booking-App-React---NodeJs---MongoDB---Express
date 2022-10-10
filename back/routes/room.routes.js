import { Router } from 'express';
const router = Router();

import { verifyUser } from '../middleware/auth.middleware.js';
import {
  getRoom,
  getAllRooms,
  createRoom,
  updateRoom,
  updateRoomAvailability,
  deleteRoom,
} from '../controllers/room.controller.js';

//Read - Get
router.get('/:id', getRoom);
router.get('/', getAllRooms);

//Create - post
router.post('/:hotelid', verifyUser, createRoom);

//Update - Put
router.put('/availability/:id', verifyUser, updateRoomAvailability);
router.put('/:id', verifyUser, updateRoom);

//Delete
router.delete('/:id/:hotelid', verifyUser, deleteRoom);

export default router;
