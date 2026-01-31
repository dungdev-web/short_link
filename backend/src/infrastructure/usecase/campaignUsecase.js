const Campaign = require("../../domain/campaign/CampaignEtity");

const campaignUsecase = (campaignRepository) => ({
  createCampaign: async ({
    user_id,
    name,
    description,
    start_date,
    quantity,
    budget,
  }) => {
    const campaign = Campaign.create({
      user_id,
      name,
      description,
      start_date,
      quantity,
      budget,
    });
    return campaignRepository.create(campaign.toJSON());
  },

  getCampaigns: (user_id) => campaignRepository.getAll(user_id),

  getCampaignById: (id) => campaignRepository.getById(id),

  updateCampaign: async (id, data) => {
    const existing = await campaignRepository.getById(id);
    if (!existing) throw new Error("Campaign not found");

    const campaignEntity = new Campaign(existing);

    campaignEntity.update(data);
    return await campaignRepository.update(id, campaignEntity.toJSON());
  },
  deleteCampaign: (id) => campaignRepository.delete(id),
  addLinkToCampaign: (id, link_id) =>
    campaignRepository.addLinkToCampaign(id, link_id),

  getLinksInCampaign: (campaign_id) =>
    campaignRepository.getLinksInCampaign(campaign_id),
  getCampaignsByLink: (link_id) =>
    campaignRepository.getCampaignsByLink(link_id),

  removeLinkFromCampaign: (campaign_id, link_id) =>
    campaignRepository.removeLinkFromCampaign(campaign_id, link_id),
});

module.exports = campaignUsecase;
