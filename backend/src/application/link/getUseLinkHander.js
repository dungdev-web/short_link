// application/link/getUserLinkHandler.js
module.exports = (getUserLinkUseCase) => async (req, res, next) => {
    const userId = parseInt(req.params.userID);
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
  
    const offset = (page - 1) * limit;
  
    const result = await getUserLinkUseCase(userId, { limit, offset });
  
    res.json({
      currentPage: page,
      perPage: limit,
      total: result.total,
      links: result.links
    });
  };