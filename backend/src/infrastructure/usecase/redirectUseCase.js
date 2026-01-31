// usecase/redirectUseCase.js
module.exports = function redirectUseCase(linkRepository, clickLogRepository) {
  return async function({ shortCode, request }) {
    const link = await linkRepository.findByShortCode(shortCode);
    
    if (!link) {
      throw new Error('Short URL not found');
    }
    if (!link.getId()) {
      throw new Error('ID not found');
    }

    link.incrementClick();
    await linkRepository.incrementClickCount(shortCode);

    const ipAddress = request.ip;
    const macAddress = request.headers['x-mac-address'] || 'Unknown'; 
    const deviceInfo = request.headers['x-device-info'] || 'Unknown'; 
    const location = request.headers['x-location'] || 'Unknown'; 
    const referer = request.headers['referer'] || 'Unknown';
    const userAgent = request.headers['user-agent'];

    await clickLogRepository.save({
      linkId: link.getId(),
      ipAddress,
      macAddress,
      deviceInfo,
      location,
      referer,
      userAgent
    });

    // Trả về URL gốc
    return link.getOriginalUrl();
  };
};
