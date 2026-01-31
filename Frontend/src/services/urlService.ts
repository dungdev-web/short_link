import { IS_MOCK, API_BASE_URL } from "@/config/env";
import { getMockLinks, saveMockLinks } from "@/mocks/mockLinks";
import { ILinks } from "@/types/ILinks";

// ----------------- SHORTEN URL -----------------
export const shortenUrl = async (url: string, userId: string | null, shortUrl: string): Promise<string> => {
  if (!userId) throw new Error("User not authenticated.");

  if (IS_MOCK) {
    const links = getMockLinks();

    const newLink: ILinks = {
      id: links.length + 1,
      user_id: Number(userId),
      original_url: url,
      short_code: shortUrl,
      short_url: `https://mms-group/${shortUrl}`,
      title: null,
      description: null,
      click_count: 0,
      is_active: true,
      is_private: false,
      expires_at: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    links.push(newLink);
    saveMockLinks(links);

    return newLink.short_url;
  } else {
    const response = await fetch(`${API_BASE_URL}/shorten`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ originalUrl: url, userId, shortUrl }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || data.message || "Failed to shorten the URL");

    return data.shortUrl;
  }
};

// ----------------- FETCH LINKS -----------------
export const fetchLinks = async (token: string, page: number, limit: number) => {
  if (IS_MOCK) {
    const links = getMockLinks();
    const userLinks = links.filter(link => String(link.user_id) === token);
    const paginatedLinks = userLinks.slice((page - 1) * limit, page * limit);

    return {
      links: paginatedLinks,
      totalPages: Math.ceil(userLinks.length / limit),
    };
  } else {
    const res = await fetch(`${API_BASE_URL}/link/${token}?page=${page}&limit=${limit}`);
    if (!res.ok) throw new Error("Lấy data lỗi");

    const data = await res.json();
    if (!Array.isArray(data.links)) throw new Error("Format dữ liệu không đúng");

    return {
      links: data.links,
      totalPages: Math.ceil((data.total || 0) / limit),
    };
  }
};
