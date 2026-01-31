// repositories/postgresBid.js
const { PrismaClient } = require("@prisma/client");
class PostgresBid {
  constructor(prisma) {
    this.prisma = prisma || new PrismaClient();
  }

  async createBid(data) {
    return this.prisma.bid.create({
      data,
    });
  }

  async findById(bidId) {
    return this.prisma.bid.findUnique({
      where: { id: Number(bidId) },
    });
  }

  async findByCampaignAndUser(campaignId, earnerId) {
    return this.prisma.bid.findFirst({
      where: { campaignId, earnerId },
    });
  }

  async approveBid(bidId) {
    return this.prisma.bid.update({
      where: { id: bidId },
      data: {
        status: "approved",
      },
    });
  }
}

module.exports = PostgresBid;
