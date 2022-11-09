const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'https://angel.nomoredomains.icu',
  'http://angel.nomoredomains.icu',
  'http://masimovies.nomoredomains.icu',
  'https://masimovies.nomoredomains.icu',
  'localhost:3000',
  'http://localhost:7777',
];
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    const requestHeaders = req.headers['access-control-request-headers'];
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  return next();
};
