// application/link/getDetailLinkUseCase.js
module.exports = (getDetailLinkUseCase) => async (req, res, next) => {
  const link_id = parseInt(req.params.link_id);  
  const result = await getDetailLinkUseCase(link_id);
  const { clicks, ...linkInfo } = result;
  res.json({
    service: clicks, 
    link: linkInfo   
  });
};
