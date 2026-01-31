// infrastructure/usecase/getDetailLinkUseCase.js
module.exports = (linkRepository) => async (link_id) => {
    return await linkRepository.getDetail(link_id);
  };