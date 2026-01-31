module.exports = function (err, req, res, next) {
  console.error(`[Error] ${req.method} ${req.originalUrl}`);
  console.error(err);

  if (res.headersSent) return next(err); // Nếu đã gửi rồi thì bỏ qua

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({ error: message });
};
