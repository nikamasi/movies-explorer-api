const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { moviesRouter } = require('./movies');
const { usersRouter } = require('./users');
const { createUser, login } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');
const auth = require('../middlewares/auth');
const { INVALID_URL_OR_METHOD } = require('../utils/constants');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    password: Joi.string().required(),
    email: Joi.string().email().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    password: Joi.string().required(),
    email: Joi.string().email().required(),
  }),
}), login);

router.use(auth);

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.use((req, res, next) => {
  next(new NotFoundError(INVALID_URL_OR_METHOD));
});

module.exports = router;
