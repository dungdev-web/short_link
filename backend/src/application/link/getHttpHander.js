// application/link/getHttpHander.js
module.exports = function (getLinksUseCase) {
    return async function (req, res, next) {
      getLinksUseCase()
        .then((links) => res.json({ data: links }))
        .catch(next);
    };
  };
  