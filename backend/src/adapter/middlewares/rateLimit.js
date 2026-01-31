// src/adapter/middlewares/rateLimit.js
const rateLimit = require("express-rate-limit");

const otpRequestLimiter = rateLimit({
  windowMs: 4 * 60 * 1000,
  max: 5,
  message: {
    error: "Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau 4 phút.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = otpRequestLimiter;
