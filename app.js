require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const rateLimiter = require('./middlewares/rateLimiter');
const router = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const { mongodbLink } = require('./utils/config');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect(mongodbLink, {
  useNewUrlParser: true,
  useUnifiedTopology: false,
});

app.use(helmet());
app.use(rateLimiter);
app.use(requestLogger);
app.use(cors);
app.use(express.json());

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
