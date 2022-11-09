const router = require('express').Router();
const { moviesRouter } = require('./movies');
const { usersRouter } = require('./users');
const { createUser, login } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');
const auth = require('../middlewares/auth');
const { INVALID_URL_OR_METHOD } = require('../utils/constants');
const { signUpValidate, signinValidate } = require('../validators/userValidators');

router.post('/signup', signUpValidate, createUser);

router.post('/signin', signinValidate, login);

router.use(auth);

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.use((req, res, next) => {
  next(new NotFoundError(INVALID_URL_OR_METHOD));
});

module.exports = router;
