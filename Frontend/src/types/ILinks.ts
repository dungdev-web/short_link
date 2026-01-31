import { IUser } from "./IUsers";

export interface ILinks {
  id: number;
  user_id: number;
  original_url: string;
  short_code: string;
  short_url: string;
  title: string | null;
  description: string | null;
  click_count: number;
  is_active: boolean;
  is_private: boolean;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
}
