const { celebrate, Joi } = require('celebrate');
const { urlRegex } = require('../utils/regex');

const moviePostValidate = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string(),
    description: Joi.string().required(),
    image: Joi.string().regex(urlRegex).required(),
    trailer: Joi.string().regex(urlRegex).required(),
    thumbnail: Joi.string().regex(urlRegex).required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.number().required(),
  }),
});

const movieDeleteValidate = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  moviePostValidate,
  movieDeleteValidate,
};
