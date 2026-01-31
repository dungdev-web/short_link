const CampaignRepository = require('../../infrastructure/repository/postgresCampaignRepository');
const campaignUsecase = require('../../infrastructure/usecase/campaignUsecase');

const campaignRepository = new CampaignRepository();
const campaignService = campaignUsecase(campaignRepository);

module.exports = campaignService;
