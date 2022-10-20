import mongoose from 'mongoose';

const HotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  posterId: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  distance: {
    type: String,
    required: true,
  },
  photos: {
    type: [String],
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  roomsList: {
    type: [
      {
        title: String,
        rommNumber: Number,
        price: Number,
        desc: String,
        maxPeople: Number,
        unavailableDates: { type: [Date] },
      },
    ],
  },
  cheapestPrice: {
    type: Number,
    required: true,
  },
  animals: {
    type: Boolean,
    required: true,
    default: false,
  },
  love: {
    type: Boolean,
    required: true,
    default: false,
  },
  fami: {
    type: Boolean,
    required: true,
    default: false,
  },
  eco: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export default mongoose.model('hotel', HotelSchema);
