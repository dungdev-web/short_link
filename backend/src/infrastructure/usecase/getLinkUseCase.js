// infrastructure/usecase/getLinkUseCase.js
module.exports = function getAllLinksUseCase(linkRepository) {
    return async function () {
      return linkRepository.getAll();
    };
  };
  