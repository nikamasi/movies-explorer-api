const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');
const { devJwtKey } = require('../utils/config');

const { NODE_ENV, JWT_SECRET } = process.env;
const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthError('Authorization error'));
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : devJwtKey);
  } catch (err) {
    return next(new AuthError('Authorization error'));
  }
  req.user = payload;
  return next();
};
