// services/campaignService.ts

import { IS_MOCK, API_BASE_URL } from "@/config/env";
import { getMockCampaigns, saveMockCampaigns } from "@/mocks/campaigns";
import { getMockCampaignLinks, saveMockCampaignLinks } from "@/mocks/campaignLinks";
import { Campaign } from "@/types/Campaign";
import { CampaignLink } from "@/types/Campaign";

// --------- GET ALL CAMPAIGNS ---------
export async function getCampaigns(): Promise<Campaign[]> {
  if (IS_MOCK) {
    return getMockCampaigns();
  }
  const res = await fetch(`${API_BASE_URL}/campaigns`);
  if (!res.ok) throw new Error("Lỗi khi lấy danh sách chiến dịch");
  const data = await res.json();
  return data.campaigns;
}

// --------- CREATE NEW CAMPAIGN ---------
export async function createCampaign(payload: Omit<Campaign, "id" | "created_at">): Promise<Campaign> {
  if (IS_MOCK) {
    const campaigns = getMockCampaigns();
    const newCampaign: Campaign = {
      ...payload,
      id: campaigns.length ? Math.max(...campaigns.map(c => c.id)) + 1 : 1,
      created_at: new Date().toISOString(),
    };
    saveMockCampaigns([...campaigns, newCampaign]);
    return newCampaign;
  }
  const res = await fetch(`${API_BASE_URL}/campaigns`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Tạo mới chiến dịch thất bại");
  }
  const data = await res.json();
  return data.campaign;
}

// --------- UPDATE CAMPAIGN ---------
export async function updateCampaign(id: number, updates: Partial<Omit<Campaign, "id" | "created_at">>): Promise<Campaign> {
  if (IS_MOCK) {
    const campaigns = getMockCampaigns();
    const idx = campaigns.findIndex(c => c.id === id);
    if (idx === -1) throw new Error("Không tìm thấy chiến dịch");
    const updated = {
      ...campaigns[idx],
      ...updates,
    };
    campaigns[idx] = updated;
    saveMockCampaigns(campaigns);
    return updated;
  }
  const res = await fetch(`${API_BASE_URL}/campaigns/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Cập nhật chiến dịch thất bại");
  }
  const data = await res.json();
  return data.campaign;
}

// --------- DELETE CAMPAIGN ---------
export async function deleteCampaign(id: number): Promise<void> {
  if (IS_MOCK) {
    const campaigns = getMockCampaigns().filter(c => c.id !== id);
    saveMockCampaigns(campaigns);
    // remove related links
    const links = getMockCampaignLinks().filter(cl => cl.campaign_id !== id);
    saveMockCampaignLinks(links);
    return;
  }
  const res = await fetch(`${API_BASE_URL}/campaigns/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Xóa chiến dịch thất bại");
}
// --------- GET LINKS FOR A CAMPAIGN ---------
export async function getLinksByCampaign(campaignId: number): Promise<CampaignLink[]> {
  if (IS_MOCK) {
    return getMockCampaignLinks().filter(cl => cl.campaign_id === campaignId);
  }
  const res = await fetch(`${API_BASE_URL}/campaigns/${campaignId}/links`);
  if (!res.ok) throw new Error("Lỗi khi lấy liên kết của chiến dịch");
  const data = await res.json();
  return data.links;
}

// --------- GET ALL LINK–CAMPAIGN MAPPINGS ---------
export async function getAllCampaignLinks(): Promise<CampaignLink[]> {
  if (IS_MOCK) {
    return getMockCampaignLinks();
  }
  const res = await fetch(`${API_BASE_URL}/campaigns/links`);
  if (!res.ok) throw new Error("Lỗi khi lấy mapping chiến dịch-liên kết");
  const data = await res.json();
  return data.campaignLinks;
}

// --------- ATTACH LINK TO CAMPAIGN ---------
export async function attachLinkToCampaign(campaignId: number, linkId: number): Promise<CampaignLink> {
  if (IS_MOCK) {
    const links = getMockCampaignLinks();
    const exists = links.find(cl => cl.campaign_id === campaignId && cl.link_id === linkId);
    if (exists) throw new Error("Liên kết đã tồn tại");
    const newCL: CampaignLink = { campaign_id: campaignId, link_id: linkId };
    saveMockCampaignLinks([...links, newCL]);
    return newCL;
  }
  const res = await fetch(`${API_BASE_URL}/campaigns/${campaignId}/links`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ link_id: linkId }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Gắn liên kết thất bại");
  }
  const data = await res.json();
  return data.campaignLink;
}

// --------- DETACH LINK FROM CAMPAIGN ---------
export async function detachLinkFromCampaign(campaignId: number, linkId: number): Promise<void> {
  if (IS_MOCK) {
    const filtered = getMockCampaignLinks().filter(
      cl => !(cl.campaign_id === campaignId && cl.link_id === linkId)
    );
    saveMockCampaignLinks(filtered);
    return;
  }
  const res = await fetch(`${API_BASE_URL}/campaigns/${campaignId}/links/${linkId}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Tháo liên kết thất bại");
  }
}

