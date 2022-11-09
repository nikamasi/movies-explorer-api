const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const AuthError = require('../errors/AuthError');
const {
  INVALID_EMAIL,
  INVALID_CREDENTIALS,
  MIN_2_CHARACTERS,
  MAX_30_CHARACTERS,
} = require('../utils/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, INVALID_EMAIL],
  },
  name: {
    type: String,
    required: true,
    minlength: [2, MIN_2_CHARACTERS],
    maxlength: [30, MAX_30_CHARACTERS],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password').then((user) => {
    if (!user) {
      return Promise.reject(new AuthError(INVALID_CREDENTIALS));
    }
    return bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        return Promise.reject(new AuthError(INVALID_CREDENTIALS));
      }
      return user;
    });
  });
};

module.exports = mongoose.model('user', userSchema);
