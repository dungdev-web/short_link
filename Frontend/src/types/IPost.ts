export interface IPost {
  id: number;
  user_id: number;
  title: string;
  content: string;
  campaign_id: number;
  link_id: number;
  created_at: string; 
}
export interface PostLink {
  post_id: number;
  link_id: number;
}
