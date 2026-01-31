// mock/campaignLinks.ts

import { CampaignLink } from "@/types/Campaign";

const defaultCampaignLinks: CampaignLink[] = [
  { campaign_id: 3, link_id: 101 },
  { campaign_id: 3, link_id: 102 },
  { campaign_id: 4, link_id: 103 },
  { campaign_id: 4, link_id: 104 },
];

export const getMockCampaignLinks = (): CampaignLink[] => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("mockCampaignLinks");
    return stored ? JSON.parse(stored) : defaultCampaignLinks;
  }
  return defaultCampaignLinks;
};

export const saveMockCampaignLinks = (links: CampaignLink[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("mockCampaignLinks", JSON.stringify(links));
  }
};
