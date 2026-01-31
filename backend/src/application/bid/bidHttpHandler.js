// handlers/bidHttpHandler.js
class BidHttpHandler {
  constructor(bidUsecase) {
    this.bidUsecase = bidUsecase;
  }

  createBid = async (req, res, next) => {
    const { campaignId, note } = req.body;
    const earnerId = req.user.id;
    const bid = await this.bidUsecase.createBid({ campaignId, earnerId, note });
    res.status(201).json({ message: 'Đã tạo giá thầu', bid });
  };

  approveBid = async (req, res, next) => {
    const bidId = Number(req.params.id);
    const creatorId = req.user.id;
    const { approvedBid, task } = await this.bidUsecase.approveBid(bidId, creatorId);
    res.json({
      message: "Giá thầu đã được duyệt, đã tạo nhiệm vụ",
      bid: approvedBid,
      task
    });
  };
}

module.exports = BidHttpHandler;
