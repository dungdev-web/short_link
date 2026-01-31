// mocks/posts.ts

import { IPost } from "@/types/IPosts";

const defaultPosts: IPost[] = [];

export const getMockPosts = (): IPost[] => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("mockPosts");
    return stored ? JSON.parse(stored) : defaultPosts;
  }
  return defaultPosts;
};

export const saveMockPosts = (posts: IPost[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("mockPosts", JSON.stringify(posts));
  }
};
