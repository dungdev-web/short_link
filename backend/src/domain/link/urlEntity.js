module.exports = function createUrlEntity({
  id,
  originalUrl,
  shortCode,
  clickCount = 0,
  shortUrl,
  userId,
  createdAt = new Date(),
  expiresAt = null,
}) {
  if (!originalUrl || typeof originalUrl !== "string") {
    throw new Error("originalUrl is required and must be a string");
  }

  if (!shortCode || typeof shortCode !== "string") {
    throw new Error("shortCode is required and must be a string");
  }

  let _clickCount = clickCount;
  let _id = id;

  return {
    getId: () => _id,
    setId: (newId) => {
      _id = newId;
    },
    getOriginalUrl: () => originalUrl,
    getShortCode: () => shortCode,
    getClickCount: () => _clickCount,
    getCreatedAt: () => createdAt,
    getShortUrl: () => shortUrl,
    getUserId: () => userId,
    getExpiresAt: () => expiresAt,

    incrementClick: () => {
      _clickCount += 1;
    },

    toJSON: () => ({
      id: _id,
      originalUrl,
      shortCode,
      shortUrl,
      userId,
      clickCount: _clickCount,
      createdAt,
      expiresAt,
    }),
  };
};
