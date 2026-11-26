/**
 * Centralized error handler. Keeps controllers free of repetitive try/catch
 * boilerplate for unexpected errors (validation errors are handled inline
 * in the controllers since they return 400 with field-level details).
 */
function notFound(req, res, next) {
  res.status(404).json({ success: false, message: `Route not found: ${req.originalUrl}` });
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  console.error('Unhandled error:', err);

  const statusCode = err.statusCode && err.statusCode >= 400 ? err.statusCode : 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal server error',
  });
}

module.exports = { notFound, errorHandler };
