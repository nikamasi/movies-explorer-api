const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { urlRegex } = require('../utils/regex');

const moviesRouter = express.Router();
const {
  getMovies,
  addMovie,
  deleteMovie,
} = require('../controllers/movies');

moviesRouter.get('/', getMovies);

moviesRouter.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().max(4),
    description: Joi.string().required(),
    image: Joi.string().regex(urlRegex).required(),
    trailer: Joi.string().regex(urlRegex).required(),
    thumbnail: Joi.string().regex(urlRegex).required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.string().required(),
  }),
}), addMovie);

moviesRouter.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
}), deleteMovie);

module.exports = {
  moviesRouter,
};
