import { Router } from 'express';
const router = Router();

import { verifyUser } from '../middleware/auth.middleware.js';
import {
  getHotel,
  getAllHotels,
  countByCity,
  countByType,
  createHotel,
  updateHotel,
  deleteHotel,
  createRoom,
  editRoom,
  updateRoomAvailability,
  deleteRoom,
  addRating,
} from '../controllers/hotel.controller.js';

//Read - Get
router.get('/:id', getHotel);
router.get('/', getAllHotels);
router.get('/countByCity', countByCity);
router.get('/countByType', countByType);

//Create - post
router.post('/', verifyUser, createHotel);

//Update - Put
router.put('/:id', verifyUser, updateHotel);

//Delete
router.delete('/:id', verifyUser, deleteHotel);

//Rating
router.patch('/:id/addRating', verifyUser, addRating);

// Room

router.patch('/:id/createRoom', verifyUser, createRoom);
router.patch('/:id/editRoom', verifyUser, editRoom);
router.put('/:id/availability', updateRoomAvailability);
router.patch('/:id/deleteRoom', verifyUser, deleteRoom);

export default router;
