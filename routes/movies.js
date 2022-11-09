const express = require('express');

const moviesRouter = express.Router();
const {
  getMovies,
  addMovie,
  deleteMovie,
} = require('../controllers/movies');
const { moviePostValidate, movieDeleteValidate } = require('../validators/movieValidators');

moviesRouter.get('/', getMovies);

moviesRouter.post('/', moviePostValidate, addMovie);

moviesRouter.delete('/:movieId', movieDeleteValidate, deleteMovie);

module.exports = {
  moviesRouter,
};
