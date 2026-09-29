'use strict';

const { ZodError } = require('zod');

/**
 * Error class for signaling a resource was not found (mapped to HTTP 404).
 */
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: 'Validation failed',
      details: err.errors.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message,
      })),
    });
  }

  if (err instanceof NotFoundError || err.statusCode === 404) {
    return res.status(404).json({ error: err.message || 'Resource not found' });
  }

  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({ error: err.message || 'Internal server error' });
}

module.exports = { errorHandler, NotFoundError };
