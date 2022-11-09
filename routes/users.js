const express = require('express');

const usersRouter = express.Router();
const {
  getCurrentUser, updateUser,
} = require('../controllers/users');
const { userPatchValidate } = require('../validators/userValidators');

usersRouter.get('/me', getCurrentUser);

usersRouter.patch('/me', userPatchValidate, updateUser);

module.exports = {
  usersRouter,
};
