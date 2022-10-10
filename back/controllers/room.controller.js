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
  const hotelId = req.params.hotelid;
  const newRoom = new RoomModel(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await HotelModel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

// Update - put
export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await RoomModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};
export const updateRoomAvailability = async (req, res, next) => {
  try {
    await RoomModel.updateOne(
      { 'roomNumbers._id': req.params.id },
      {
        $push: {
          'roomNumbers.$.unavailableDates': req.body.dates,
        },
      }
    );
    res.status(200).json('Room status has been updated.');
  } catch (err) {
    next(err);
  }
};

// Delete
export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  try {
    await RoomModel.findByIdAndDelete(req.params.id);
    try {
      await HotelModel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json('Room has been deleted.');
  } catch (err) {
    next(err);
  }
};
