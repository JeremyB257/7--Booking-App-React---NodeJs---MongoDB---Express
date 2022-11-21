import hotelModel from '../models/hotel.model.js';
import HotelModel from '../models/hotel.model.js';

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

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(',');
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return HotelModel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await HotelModel.countDocuments({ type: 'hotel' });
    const apartmentCount = await HotelModel.countDocuments({ type: 'apartment' });
    const houseCount = await HotelModel.countDocuments({ type: 'house' });
    const villaCount = await HotelModel.countDocuments({ type: 'villa' });

    res.status(200).json([
      { type: 'hotel', count: hotelCount },
      { type: 'apartments', count: apartmentCount },
      { type: 'house', count: houseCount },
      { type: 'villas', count: villaCount },
    ]);
  } catch (err) {
    next(err);
  }
};

// Create - post
export const createHotel = async (req, res, next) => {
  const newHotel = new HotelModel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    return res.status(400).json({ message: "Le formulaire n'est pas remplis correctement !" });
  }
};

// Update - put
export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await HotelModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};

// Delete
export const deleteHotel = async (req, res, next) => {
  try {
    await HotelModel.findByIdAndDelete(req.params.id);
    res.status(200).json('Hotel has been deleted.');
  } catch (err) {
    next(err);
  }
};

//rating
export const addRating = async (req, res, next) => {
  try {
    const hotel = await HotelModel.findById(req.params.id);
    let rating = hotel.rating.find((obj) => {
      return obj.posterId === req.user.id;
    });
    if (rating) {
      // i modify rating for this hotel
      
      try {
        rating.rating = req.body.rating;

        hotel.save((err) => {
          if (!err) return res.status(200).json({ message: 'Avis modifié' });
          return res.status(500).json({ err });
        });
      } catch (err) {
        return res.status(400).json(err);
      }
    } else {
      // i add rating for this hotel
      try {
        return hotel.updateOne(
          {
            $push: {
              rating: {
                posterId: req.body.posterId,
                rating: req.body.rating,
              },
            },
          },
          { new: true },
          (err, docs) => {
            if (!err) return res.status(200).send(docs);
            else return res.status(400).send(err);
          }
        );
      } catch (err) {
        return res.status(400).send(err);
      }
    }
  } catch (err) {
    next(err);
  }
};

// Room

export const createRoom = async (req, res, next) => {};

export const editRoom = async (req, res, next) => {};

export const updateRoomAvailability = async (req, res, next) => {
  try {
    hotelModel
      .findById(req.params.id)
      .then((hotel) => {
        const theRoom = hotel.roomsList.find((obj) => obj._id.equals(req.body.roomId));
        if (!theRoom) {
          return res.status(404).json({ message: 'Not found' });
        } else {
          theRoom.unavailableDates = req.body.dates;
          hotel.save((err) => {
            if (!err) return res.status(200).json({ message: 'Sauvegarde reussi' });
            return res.status(500).json({ err });
          });
        }
      })
      .catch((err) => res.status(500).json({ err }));
  } catch (err) {
    return res.status(400).send(err);
  }
};

export const deleteRoom = async (req, res, next) => {};
