const { StatusCodes } = require('http-status-codes');
const BadRequestError = require('../errors/BadRequestError');
const AccessDeniedError = require('../errors/AccessDeniedError');
const NotFoundError = require('../errors/NotFoundError');
const Movie = require('../models/movie');
const { DELETION_NOT_ALLOWED, MOVIE_NOT_FOUND, INVALID_ID } = require('../utils/constants');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

const addMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    owner,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink: trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  })
    .then((movie) => {
      res.status(StatusCodes.CREATED).send(movie);
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        next(new BadRequestError(e.message));
      } else {
        next(e);
      }
    });
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .orFail(() => next(new NotFoundError(MOVIE_NOT_FOUND)))
    .then((movieFound) => {
      if (movieFound.owner.toString() !== req.user._id) {
        return next(
          new AccessDeniedError(DELETION_NOT_ALLOWED),
        );
      }
      return Movie.findByIdAndRemove(movieId).then((data) => res.send(data));
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        next(new BadRequestError(INVALID_ID));
      } else {
        next(e);
      }
    });
};

module.exports = {
  getMovies,
  addMovie,
  deleteMovie,
};
