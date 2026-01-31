// types/Campaign.ts

export interface Campaign {
  id: number;
  user_id: number | null;
  owner_id: number | null;
  name: string;
  description: string | null;
  start_date: string | null; 
  end_date: string | null;   
  status: 'active' | 'inactive' | string;
  budget: number | null;
  created_at: string; 
 
}
export interface CampaignLink {
  campaign_id: number;
  link_id: number;
}
