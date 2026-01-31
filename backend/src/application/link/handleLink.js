// application/link/handleLink.js
module.exports = function (redirectUseCase) {
  return async function (req, res, next) {
    const { shortCode } = req.params;
    redirectUseCase({ shortCode, request: req })
      .then((originalUrl) => {
        if (!originalUrl) return res.sendStatus(404);
        res.redirect(originalUrl);
      })
      .catch(next);
  };
};
