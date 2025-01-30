function ErrorHandler(err, req, res, next) {
  const errStatus = err.status || err.statusCode || 500;
  const errMsg = err.message || req.t("errors.server");

  // Handle Joi validation errors
  // if (err instanceof ValidationError) {
  //   errStatus = 400; // Bad Request
  //   errMsg = err.details.map(detail => detail.message).join(', ');
  // }
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: process.env.NODE_ENV === "development" ? err.stack : {},
  });
  next();
}

module.exports = ErrorHandler;
