// usecases/bidUsecase.js
class BidUsecase {
  constructor(bidRepository, taskRepository, campaignRepository) {
    this.bidRepository = bidRepository;
    this.taskRepository = taskRepository;
    this.campaignRepository = campaignRepository;
  }

  async createBid(input) {
    const existing = await this.bidRepository.findByCampaignAndUser(
      input.campaignId,
      input.earnerId
    );
    if (existing) {
      throw new Error("Bạn đã áp dụng chiến dịch này rồi");
    }
    const bid = await this.bidRepository.createBid({
      campaignId: input.campaignId,
      earnerId: input.earnerId,
      note: input.note,
      status: "pending",
    });
    return bid;
  }

  async approveBid(bidId) {
    const bid = await this.bidRepository.findById(bidId);
    if (!bid) throw new Error("Lời đề nghị bạn không tồn tại");

    const campaign = await this.campaignRepository.findById(bid.campaignId);
    if (!campaign) throw new Error("Chiến dịch không tìm thấy");

    if (bid.status !== "pending" && bid.status !== "submitted") {
      throw new Error("Không thể phê duyệt giá thầu này");
    }

    const campaignLinks = campaign.campaign_links || [];
    if (campaignLinks.length === 0) {
      throw new Error("Không có link được tìm thấy trong chiến dịch");
    }

    const approvedBid = await this.bidRepository.approveBid(bidId);
    const randomLink =
      campaignLinks[Math.floor(Math.random() * campaignLinks.length)];
    const linkId = randomLink.link_id;
    const shortUrl = randomLink.link.short_url;
    
    const task = await this.taskRepository.createTask({
      campaignId: bid.campaignId,
      earnerId: bid.earnerId,
      linkId: linkId,
      quantity: 1,
      status: "assigned",
      proofUrl: shortUrl,
    });

    return { approvedBid, task };
  }
}

module.exports = BidUsecase;
