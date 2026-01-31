import { PostLink } from "@/types/IPost";

const defaultPostLinks: PostLink[] = [
  { post_id: 1, link_id: 101 },
  { post_id: 1, link_id: 102 },
  { post_id: 2, link_id: 103 },
];

export const getMockPostLinks = (): PostLink[] => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("mockPostLinks");
    return stored ? JSON.parse(stored) : defaultPostLinks;
  }
  return defaultPostLinks;
};

export const saveMockPostLinks = (links: PostLink[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("mockPostLinks", JSON.stringify(links));
  }
};
