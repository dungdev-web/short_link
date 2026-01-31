export interface IPost {
  id: number;
  title: string;
  content: string;
  thumbnail: string | null;
  campaign_id: string;
  created_at: string;
  updated_at: string;
}
