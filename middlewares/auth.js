const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');
const { JWT_KEY } = require('../utils/config');
const { AUTH_ERROR } = require('../utils/constants');

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthError(AUTH_ERROR));
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, JWT_KEY);
  } catch (err) {
    return next(new AuthError(AUTH_ERROR));
  }
  req.user = payload;
  return next();
};
