const express = require('express');

const usersRouter = express.Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCurrentUser, updateUser,
} = require('../controllers/users');

usersRouter.get('/me', getCurrentUser);

usersRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email(),
  }).or('name', 'email'),
}), updateUser);

module.exports = {
  usersRouter,
};
