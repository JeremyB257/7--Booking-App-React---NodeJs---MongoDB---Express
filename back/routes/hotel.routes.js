import { Router } from 'express';
const router = Router();

import { verifyUser } from '../middleware/auth.middleware.js';
import {
  getHotel,
  getAllHotels,
  getHotelRooms,
  countByCity,
  countByType,
  createHotel,
  updateHotel,
  deleteHotel,
} from '../controllers/hotel.controller.js';

//Read - Get
router.get('/find/:id', getHotel);
router.get('/', getAllHotels);
router.get('/countByCity', countByCity);
router.get('/countByType', countByType);
router.get('/room/:id', getHotelRooms);

//Create - post
router.post('/', verifyUser, createHotel);

//Update - Put
router.put('/:id', verifyUser, updateHotel);

//Delete
router.delete('/:id', verifyUser, deleteHotel);

export default router;
