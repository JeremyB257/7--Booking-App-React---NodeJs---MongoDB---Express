import HotelModel from '../models/hotel.model.js';
import RoomModel from '../models/room.model.js';

//Read - Get
export const getHotel = async (req, res, next) => {
  try {
    const hotel = await HotelModel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

export const getAllHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const hotels = await HotelModel.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit);
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await HotelModel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return RoomModel.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

export const countByCity = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

export const countByType = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

// Create - post
export const createHotel = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

// Update - put
export const updateHotel = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

// Delete
export const deleteHotel = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};
