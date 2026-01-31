// infrastructure/usecase/getUserLinkUseCase.js
module.exports = (linkRepository) => async (userId, { limit, offset }) => {
    return await linkRepository.getLinksByUserId(userId, { limit, offset });
  };