const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const User = require('../models/user');
const { USER_NOT_FOUND, INVALID_ID, EMAIL_NOT_UNIQUE } = require('../utils/constants');
const { devJwtKey } = require('../utils/config');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUserById = (req, res, next) => {
  User.findById(req.params.userId).orFail(() => next(new NotFoundError(USER_NOT_FOUND)))
    .then((user) => res.send({
      name: user.name,
      email: user.email,
    }))
    .catch((e) => {
      if (e.name === 'CastError') {
        next(new BadRequestError(INVALID_ID));
      } else {
        next(e);
      }
    });
};

const getCurrentUser = (req, res, next) => {
  req.params.userId = req.user._id;
  getUserById(req, res, next);
};

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name, email, password: hash,
      })
        .then((data) => {
          res.status(StatusCodes.CREATED).send({
            email: data._doc.email,
            name: data._doc.name,
          });
        })
        .catch((e) => {
          if (e.name === 'ValidationError') {
            next(new BadRequestError(e.message));
          } else if (e.code === 11000) {
            next(new ConflictError(EMAIL_NOT_UNIQUE));
          } else {
            next(e);
          }
        });
    }).catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : devJwtKey,
        { expiresIn: '7d' },
      );
      return res.send({ token });
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, email } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        next(new NotFoundError(USER_NOT_FOUND));
      }
      return res.send({
        email: user.email,
        name: user.name,
      });
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        next(new BadRequestError(e.message));
      } else {
        next(e);
      }
    });
};

module.exports = {
  getUserById,
  createUser,
  login,
  updateUser,
  getCurrentUser,
};
