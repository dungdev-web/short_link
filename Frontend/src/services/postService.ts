// services/postService.ts

import { IS_MOCK, API_BASE_URL } from "@/config/env";
import { getMockPostLinks, saveMockPostLinks } from "@/mocks/postLinks";
import { PostLink } from "@/types/IPost";
import { getMockPosts, saveMockPosts } from "@/mocks/posts";
import { IPost } from "@/types/IPost";

// --------- GET ALL POSTS ---------
export async function getPosts(): Promise<IPost[]> {
  if (IS_MOCK) {
    return getMockPosts();
  }
  const res = await fetch(`${API_BASE_URL}/posts`);
  if (!res.ok) throw new Error("Lỗi khi lấy danh sách bài viết");
  const data = await res.json();
  return data.posts;
}

// --------- CREATE NEW POST ---------
export async function createPost(payload: Omit<IPost, "id" | "created_at">): Promise<IPost> {

  if (IS_MOCK) {
    const posts = getMockPosts();
    const newPost: IPost = {
      ...payload,
      id: posts.length ? Math.max(...posts.map(p => p.id)) + 1 : 1,
      created_at: new Date().toISOString(),
    };
    saveMockPosts([...posts, newPost]);
    return newPost;
  }

  const res = await fetch(`${API_BASE_URL}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Tạo mới bài viết thất bại");
  }
  const data = await res.json();
  return data.post;
}

// --------- UPDATE POST ---------
export async function updatePost(id: number, updates: Partial<Omit<IPost, "id" | "created_at">>): Promise<IPost> {
  if (IS_MOCK) {
    const posts = getMockPosts();
    const idx = posts.findIndex(p => p.id === id);
    if (idx === -1) throw new Error("Không tìm thấy bài viết");
    const updated = {
      ...posts[idx],
      ...updates,
    };
    posts[idx] = updated;
    saveMockPosts(posts);
    return updated;
  }
  const res = await fetch(`${API_BASE_URL}/posts/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Cập nhật bài viết thất bại");
  }
  const data = await res.json();
  return data.post;
}
// --------- DELETE POST ---------
export async function deletePost(id: number): Promise<void> {
  if (IS_MOCK) {
    const posts = getMockPosts().filter(p => p.id !== id);
    saveMockPosts(posts);
    const links = getMockPostLinks().filter(pl => pl.post_id !== id);
    saveMockPostLinks(links);
    return;
  }
  const res = await fetch(`${API_BASE_URL}/posts/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Xóa bài viết thất bại");
}

// --------- GET LINKS FOR A POST ---------
export async function getLinksByPost(postId: number): Promise<PostLink[]> {
  if (IS_MOCK) {
    return getMockPostLinks().filter(pl => pl.post_id === postId);
  }
  const res = await fetch(`${API_BASE_URL}/posts/${postId}/links`);
  if (!res.ok) throw new Error("Lỗi khi lấy liên kết của bài viết");
  const data = await res.json();
  return data.links;
}

// --------- GET ALL LINK–POST MAPPINGS ---------
export async function getAllPostLinks(): Promise<PostLink[]> {
  if (IS_MOCK) {
    return getMockPostLinks();
  }
  const res = await fetch(`${API_BASE_URL}/posts/links`);
  if (!res.ok) throw new Error("Lỗi khi lấy mapping bài viết-liên kết");
  const data = await res.json();
  return data.postLinks;
}

// --------- ATTACH LINK TO POST ---------
export async function attachLinkToPost(postId: number, linkId: number): Promise<PostLink> {
  if (IS_MOCK) {
    const links = getMockPostLinks();
    const exists = links.find(pl => pl.post_id === postId && pl.link_id === linkId);
    if (exists) throw new Error("Liên kết đã tồn tại");
    const newPL: PostLink = { post_id: postId, link_id: linkId };
    saveMockPostLinks([...links, newPL]);
    return newPL;
  }
  const res = await fetch(`${API_BASE_URL}/posts/${postId}/links`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ link_id: linkId }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Gắn liên kết thất bại");
  }
  const data = await res.json();
  return data.postLink;
}

// --------- DETACH LINK FROM POST ---------
export async function detachLinkFromPost(postId: number, linkId: number): Promise<void> {
  if (IS_MOCK) {
    const filtered = getMockPostLinks().filter(
      pl => !(pl.post_id === postId && pl.link_id === linkId)
    );
    saveMockPostLinks(filtered);
    return;
  }
  const res = await fetch(`${API_BASE_URL}/posts/${postId}/links/${linkId}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Tháo liên kết thất bại");

  }
}
