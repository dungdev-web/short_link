const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const Campaign = require("../../domain/campaign/CampaignEtity");

class PostgresCampaignRepository {
  // Tạo campaign
  async create(campaignEntity) {
    const dataToCreate = {
      user: { connect: { id: campaignEntity.user_id } },
      name: campaignEntity.name,
      description: campaignEntity.description || null,
      start_date: campaignEntity.start_date
        ? new Date(campaignEntity.start_date)
        : null,
      quantity: campaignEntity.quantity,
      status: "pending",
      budget: campaignEntity.budget,
    };
    const created = await prisma.campaigns.create({ data: dataToCreate });

    return new Campaign({
      id: created.id,
      user_id: created.user_id,
      name: created.name,
      description: created.description,
      start_date: created.start_date,
      quantity: created.quantity,
      budget: created.budget,
      created_at: created.created_at,
    });
  }
  // Cập nhật campaign
  async update(id, updateData) {
    const { id: _, user_id, ...rest } = updateData;

    const dataToUpdate = {
      ...rest,
      ...(user_id && {
        user: {
          connect: { id: user_id },
        },
      }),
    };

    const updated = await prisma.campaigns.update({
      where: { id },
      data: dataToUpdate,
    });

    return new Campaign(updated);
  }
  // Lấy tất cả campaign
  async getAll(userId) {
    return await prisma.campaigns.findMany({
      where: {
        user_id: userId,
      },
    });
  }
  // Lấy campaign theo id
  async getById(id) {
    return await prisma.campaigns.findUnique({
      where: { id: Number(id) },
      include: {
        campaign_links: {
          include: {
            link: {
              select: {
                short_url: true,
                original_url: true,
              },
            },
          },
        },
      },
    });
  }
  // Xóa campaign
  async delete(id) {
    const linked = await prisma.campaign_links.findFirst({
      where: { campaign_id: id },
    });

    if (linked) {
      throw new Error("Không thể xóa chiến dịch khi chiến dịch còn tồn tại");
    }

    return await prisma.campaigns.delete({
      where: { id },
    });
  }

  // Gán link vào campaign
  async addLinkToCampaign(id, link_id) {
    return await prisma.campaign_links.create({
      data: {
        campaign: {
          connect: {
            id: Number(id),
          },
        },
        link: {
          connect: {
            id: Number(link_id),
          },
        },
      },
    });
  }
  // Lấy danh sách link trong campaign
  async getLinksInCampaign(campaign_id) {
    const campaign = await prisma.campaigns.findUnique({
      where: { id: Number(campaign_id) },
    });

    if (!campaign) {
      throw new Error("Campaign not found");
    }

    const campaignLinks = await prisma.campaign_links.findMany({
      where: { campaign_id: Number(campaign_id) },
      include: {
        link: {
          select: {
            short_url: true,
            original_url: true,
          },
        },
      },
    });

    const links = campaignLinks.map((item) => item.link);

    return {
      campaign,
      links,
    };
  }
  // lấy tất cả danh sách campain thuộc về link
  async getCampaignsByLink(link_id) {
    const linkCampaigns = await prisma.campaign_links.findMany({
      where: { link_id: Number(link_id) },
      include: {
        campaign: true, // Lấy toàn bộ thông tin campaign
      },
    });

    // Trả về mảng các campaign (bỏ thông tin trung gian campaign_links)
    return linkCampaigns.map((item) => item.campaign);
  }

  // Gỡ link khỏi campaign
  async removeLinkFromCampaign(campaign_id, link_id) {
    return await prisma.campaign_links.delete({
      where: {
        campaign_id_link_id: { campaign_id, link_id },
      },
    });
  }
  findById(id) {
    return this.getById(id);
  }
}

module.exports = PostgresCampaignRepository;
