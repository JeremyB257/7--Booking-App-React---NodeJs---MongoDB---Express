import RoomModel from '../models/room.model.js';
import HotelModel from '../models/hotel.model.js';

//Read - Get
export const getRoom = async (req, res, next) => {
  try {
    const room = await RoomModel.findById(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};

export const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await RoomModel.find();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};

// Create - post
export const createRoom = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

// Update - put
export const updateRoom = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};
export const updateRoomAvailability = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

// Delete
export const deleteRoom = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};
