const express = require("express");
const router = express.Router();
const campaignService = require("../../../application/campaign/campaignService");

router.post("/postCampaign", async (req, res, next) => {
  const { user_id, name, description, start_date, quantity, budget } = req.body;

  const campaign = await campaignService.createCampaign({
    user_id,
    name,
    description,
    start_date,
    quantity,
    budget,
  });

  res.status(201).json(campaign);
});

router.get("/getCampaignbyUserId", async (req, res, next) => {
  const user_id = req.query.user_id;
  campaignService.getCampaigns(user_id)
    .then((campaigns) => res.json(campaigns))
    .catch(next);
});

router.get("/getCampaignbyId/:id", async (req, res, next) => {
  campaignService.getCampaignById(parseInt(req.params.id))
    .then((campaign) => {
      if (!campaign) {
        return res.status(404).json({ error: "Campaign not found" });
      }
      res.json(campaign);
    })
    .catch(next);
});

router.patch("/updateCampaign/:id", async (req, res, next) => {
  const { id } = req.params;
  const { name, description, start_date, quantity, budget } = req.body;

  campaignService
    .updateCampaign(parseInt(id), { name, description, start_date, quantity, budget })
    .then((updated) => res.status(200).json(updated))
    .catch(next);
});

router.delete("/deleteCampaign/:id", async (req, res, next) => {
  campaignService
    .deleteCampaign(parseInt(req.params.id))
    .then(() => res.status(200).send())
    .catch(next);
});

// POST /campaigns/addLinkToCampaign/:id/links
router.post("/addLinkToCampaign/:id/links", async (req, res) => {
  const { link_id } = req.body;
  const { id } = req.params;
  const result = await campaignService.addLinkToCampaign(id, link_id);
  res.json(result);
});
//Get /campaign/getLinksInCampaign/:capaign_id
router.get("/getLinksInCampaign/:campaign_id", (req, res, next) => {
  const campaign_id = req.params.campaign_id;
  campaignService
    .getLinksInCampaign(campaign_id)
    .then((result) => res.json(result))
    .catch(next);
});
//Get /campaign/getCampaignsByLink/:link_id
router.get("/getCampaignsByLink/:link_id", (req, res, next) => {
  const link_id = req.params.link_id;
  campaignService
    .getCampaignsByLink(link_id)
    .then((result) => res.json(result))
    .catch(next);
});

// Gỡ link khỏi campaign
//DELETE /campaign/removeLinkFromCampaign/:capaign_id/links/:link_id
router.delete("/removeLinkFromCampaign/:campaign_id/links/:link_id", async (req, res, next) => {
  const { campaign_id, link_id } = req.params;

  campaignService
    .removeLinkFromCampaign(Number(campaign_id), Number(link_id))
    .then(() => res.status(200) .json({ message: "Link removed from campaign" }))
    .catch(next);
});


module.exports = router;
