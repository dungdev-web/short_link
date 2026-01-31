module.exports = function (linkUseCase) {
  return async function (req, res, next) {
    const { originalUrl, userId } = req.body;

    if (!originalUrl || !userId) {
      return res
        .status(400)
        .json({ error: "originalUrl and userId are required" });
    }

    linkUseCase({ originalUrl, userId })
      .then((result) => {
        res.json({
          shortCode: result.shortCode,
          userId: result.userId,
          shortUrl: result.shortUrl,
        });
      })
      .catch(next);
  };
};
