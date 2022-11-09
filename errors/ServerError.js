const { StatusCodes } = require('http-status-codes');
const { SERVER_ERROR } = require('../utils/constants');

class ServerError extends Error {
  constructor() {
    super(SERVER_ERROR);
    this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  }
}

module.exports = ServerError;
