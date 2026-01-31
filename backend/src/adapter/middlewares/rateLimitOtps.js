const rateLimitStore = new Map();

const otpRequestLimiter = (req, res, next) => {
  const key = req.body.userId || req.headers["user-id"] || req.ip;
  const now = Date.now();
  const maxAttempts = 5;
  const baseWindowMs = 4 * 60 * 1000; 

  let userData = rateLimitStore.get(key);

  if (!userData) {
    userData = {
      attempts: 1,
      firstRequestTime: now,
      blockUntil: null,
      multiplier: 1,
    };
    rateLimitStore.set(key, userData);
    return next();
  }

  if (userData.blockUntil && now < userData.blockUntil) {
    const remainingMs = userData.blockUntil - now;
    const minutes = Math.floor(remainingMs / 60000);
    const seconds = Math.floor((remainingMs % 60000) / 1000);
    return res.status(429).json({
      error: `Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau ${minutes} phút ${seconds} giây.`,
    });
  }

  if (now - userData.firstRequestTime > baseWindowMs) {
    userData.attempts = 1;
    userData.firstRequestTime = now;
    userData.blockUntil = null;
    return next();
  }

  userData.attempts++;

  if (userData.attempts > maxAttempts) {
    const blockDuration = baseWindowMs * userData.multiplier;
    userData.blockUntil = now + blockDuration;
    userData.multiplier *= 2;

    const minutes = Math.floor(blockDuration / 60000);
    const seconds = Math.floor((blockDuration % 60000) / 1000);
    return res.status(429).json({
      error: `Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau ${minutes} phút ${seconds} giây.`,
    });
  }

  return next();
};

module.exports = otpRequestLimiter;
