import { Campaign } from "./Campaign";

export interface ILinkWithEmail {
    original_url: string;
    short_code: string;
    created_at: string;
    click_count: number;
    email: string;
    short_url: string;
     campaigns?: Campaign[];   
  }
  