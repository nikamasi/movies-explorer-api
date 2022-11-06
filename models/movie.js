const mongoose = require('mongoose');
const { INVALID_URL } = require('../utils/constants');
const { urlRegex } = require('../utils/regex');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    match: [urlRegex, INVALID_URL],
  },
  trailerLink: {
    type: String,
    required: true,
    match: [urlRegex, INVALID_URL],
  },
  thumbnail: {
    type: String,
    required: true,
    match: [urlRegex, INVALID_URL],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  movieId: {
    type: String,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Movie', movieSchema);
