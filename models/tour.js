const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour most have a name'],
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, 'A tour most have a duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour most have a group size'],
  },
  difficulty: {
    type: String,
    required: [true, 'A tour most have a difficulty'],
  },
  ratingAverage: {
    type: Number,
    default: 4.5,
  },
  ratingQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'A tour most have a price'],
  },
  priceDiscount: {
    type: Number,
  },
  summary: {
    type: String,
    trim: true,
    required: [true, 'A tour most have a summary'],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    trim: true,
    required: [true, 'A tour most have a cover image'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDates: [Date],
})
const Tour = mongoose.model('Tour', schema)

module.exports = Tour
