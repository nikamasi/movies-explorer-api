const { SERVER_ERROR } = require('../utils/constants');

module.exports = (err, _, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? SERVER_ERROR : err.message;
  res.status(statusCode).send({ message });
  next();
};
