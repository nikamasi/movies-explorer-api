const { NODE_ENV, JWT_SECRET, MONGO_LINK } = process.env;

const MONGO_DB = NODE_ENV === 'production' ? MONGO_LINK : 'mongodb://localhost:27017/moviesdb';

const JWT_KEY = NODE_ENV === 'production' ? JWT_SECRET : 'very-secret-key';

module.exports = {
  MONGO_DB,
  JWT_KEY,
};
