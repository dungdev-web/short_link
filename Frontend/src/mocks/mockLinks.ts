import { ILinks } from "@/types/ILinks";

const defaultLinks: ILinks[] = [
  {
    id: 1,
    user_id: 1,
    original_url: "https://example.com",
    short_code: "abcd1234",
    short_url: "https://short.ly/abcd1234",
    title: "Example Website",
    description: "This is a description for the example website.",
    click_count: 10,
    is_active: true,
    is_private: false,
    expires_at: null,
    created_at: "2025-05-10T12:00:00.000Z",
    updated_at: "2025-05-10T12:00:00.000Z"
  },
];

export const getMockLinks = (): ILinks[] => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("mockLinks");
    return stored ? JSON.parse(stored) : defaultLinks;
  }
  return defaultLinks;
};

export const saveMockLinks = (links: ILinks[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("mockLinks", JSON.stringify(links));
  }
};
