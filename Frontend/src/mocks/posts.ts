import { IPost } from "@/types/IPost";

const defaultPosts: IPost[] = [
  {
      id: 1,
      title: "Hướng dẫn sử dụng AI trong marketing",
      content: "AI giúp tối ưu chiến dịch marketing bằng cách phân tích dữ liệu và dự đoán hành vi...",
      created_at: "2025-05-20T08:00:00.000Z",
      user_id: 0,
      campaign_id: 0,
      link_id: 0
  },
  {
      id: 2,
      title: "Chiến lược content cho năm 2025",
      content: "Để thành công, bạn cần kết hợp nội dung giá trị với công nghệ hiện đại...",
      created_at: "2025-05-18T10:30:00.000Z",
      user_id: 0,
      campaign_id: 0,
      link_id: 0
  },
];

export const getMockPosts = (): IPost[] => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("posts");
    return stored ? JSON.parse(stored) : defaultPosts;
  }
  return defaultPosts;
};

export const saveMockPosts = (posts: IPost[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("mockPosts", JSON.stringify(posts));
  }
};
