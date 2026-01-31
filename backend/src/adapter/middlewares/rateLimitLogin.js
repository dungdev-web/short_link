const rateLimit = require("express-rate-limit");
const userAttempts = new Map();

function getKey(req) {
  return req.body?.email || req.ip;
}

function calculateLockDuration(attempts) {
  if (attempts <= 3) return 0;
  return Math.pow(2, attempts - 4) * 4 * 60 * 1000;
}


const otpRequestLimiter = (req, res, next) => {
  const key = getKey(req);
  const now = Date.now();

  const userData = userAttempts.get(key) || {
    count: 0,
    lastAttempt: 0,
    lockedUntil: 0,
  };

  if (now < userData.lockedUntil) {
    const waitTime = userData.lockedUntil - now;
    const minutes = Math.floor(waitTime / 60000);
    const seconds = Math.floor((waitTime % 60000) / 1000);
    return res.status(429).json({
      error: `Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau ${minutes > 0 ? minutes + ' phút' : ''} ${seconds > 0 ? seconds + ' giây' : ''}.`,
    });
  }

  userData.count += 1;
  userData.lastAttempt = now;

  if (userData.count >= 5) {
    const delay = calculateLockDuration(userData.count);
    userData.lockedUntil = now + delay;
  }

  userAttempts.set(key, userData);
  next();
};

// 👉 Hàm reset limit cho 1 email hoặc IP
function resetRateLimit(identifier) {
  if (userAttempts.has(identifier)) {
    userAttempts.delete(identifier);
  }
}

module.exports = {
  otpRequestLimiter,
  resetRateLimit,
};

