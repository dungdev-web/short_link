const createUrlEntity = require('../../domain/link/urlEntity');

module.exports = function createShortUrlUseCase(linkRepository) {
  return async function ({ originalUrl, userId }) {
    let shortCode;
    
    do {
      shortCode = Math.random().toString(36).substring(2, 8);
    } while (await linkRepository.existsByShortCode(shortCode));
    
    const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
    const shortUrl = `${BASE_URL}/${shortCode}`;

    const linkEntity = createUrlEntity({
      originalUrl,
      shortCode,
      shortUrl,
      userId,
      createdAt: new Date(),
      clickCount: 0,
      expiresAt: null
    });

    const saved = await linkRepository.save(linkEntity);
    linkEntity.setId(saved.id); 

    return linkEntity.toJSON();
  };
};
