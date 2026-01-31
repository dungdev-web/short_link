// mock/campaigns.ts

import { Campaign } from "@/types/Campaign";

const defaultCampaigns: Campaign[] = [
  {
    id: 3,
    user_id: 1,
    owner_id: 2,
    name: "Chiến dịch Tết 2025",
    description: "Quảng bá sản phẩm dịp Tết Nguyên Đán.",
    start_date: "2025-01-01",
    end_date: "2025-02-01",
    status: "active",
    budget: 5000000.00,
    created_at: "2025-01-01T08:00:00.000Z",
  },
  {
    id: 4,
    user_id: 2,
    owner_id: 1,
    name: "Summer Sale 2025",
    description: "Chiến dịch giảm giá mùa hè.",
    start_date: "2025-06-01",
    end_date: "2025-06-30",
    status: "active",
    budget: 7500000.00,
    created_at: "2025-05-15T10:00:00.000Z",
  },
];

export const getMockCampaigns = (): Campaign[] => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("mockCampaigns");
    return stored ? JSON.parse(stored) : defaultCampaigns;
  }
  return defaultCampaigns;
};

export const saveMockCampaigns = (campaigns: Campaign[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("mockCampaigns", JSON.stringify(campaigns));
  }
};
