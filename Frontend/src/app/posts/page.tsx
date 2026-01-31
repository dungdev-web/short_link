// app/posts 
"use client";

import { useState, useEffect } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

interface IPostLocal {
  id: string;
  title: string;
  content: string;
  campaign: string;
  thumbnailUrl: string;
  created_at: string;
  status: string;
}

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [campaign, setCampaign] = useState("");
  const [shortLink, setShortLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const campaigns = [
    { id: "spring", name: "Chiến dịch Mùa Xuân" },
    { id: "summer", name: "Khuyến mãi Mùa Hè" },
    { id: "newproduct", name: "Sản phẩm mới" },
  ];

  useEffect(() => {
    if (thumbnail) {
      const url = URL.createObjectURL(thumbnail);
      setThumbnailPreview(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setThumbnailPreview(null);
    }
  }, [thumbnail]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim() || !campaign) {
      setMessage({ type: "error", text: "Vui lòng điền đầy đủ thông tin." });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const fakeLink = `https://sort.link/${uuidv4().slice(0, 6)}`;

      const newPost: IPostLocal = {
        id: uuidv4(),
        title: title.trim(),
        content: content.trim(),
        campaign,
        thumbnailUrl: thumbnailPreview || "",
        created_at: new Date().toISOString(),
        status: "Đang hoạt động",
      };

      const storedPosts = localStorage.getItem("posts");
      const postsArray: IPostLocal[] = storedPosts ? JSON.parse(storedPosts) : [];

      postsArray.unshift(newPost);
      localStorage.setItem("posts", JSON.stringify(postsArray));

      setShortLink(fakeLink);
      setMessage({ type: "success", text: "Tạo bài đăng thành công!" });

      setTitle("");
      setContent("");
      setCampaign("");
      setThumbnail(null);
    } catch (error) {
      setMessage({ type: "error", text: "Có lỗi xảy ra, vui lòng thử lại." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-6">Tạo Bài Đăng Mới</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="title" className="block font-medium mb-1">
              Tiêu đề
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={loading}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập tiêu đề bài đăng"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Nội dung</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={loading}
              required
              placeholder="Nhập nội dung bài viết..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 min-h-[200px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="thumbnail" className="block font-medium mb-1">
              Hình thu nhỏ
            </label>
            <input
              id="thumbnail"
              type="file"
              accept="image/*"
              onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
              disabled={loading}
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {thumbnailPreview && (
              <div className="mt-2">
                <img
                  src={thumbnailPreview}
                  alt="Thumbnail preview"
                  className="max-h-32 object-contain rounded mb-2"
                />
                <button
                  type="button"
                  onClick={() => setThumbnail(null)}
                  className="text-red-500 text-sm underline"
                >
                  Xóa hình
                </button>
              </div>
            )}
          </div>

          <div>
            <label htmlFor="campaign" className="block font-medium mb-1">
              Chiến dịch
            </label>
            <select
              id="campaign"
              value={campaign}
              onChange={(e) => setCampaign(e.target.value)}
              disabled={loading}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Chọn chiến dịch --</option>
              {campaigns.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 text-white rounded-lg px-6 py-3 hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <FaPaperPlane />
            {loading ? "Đang tạo..." : "Tạo bài đăng"}
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 font-semibold ${message.type === "success" ? "text-green-600" : "text-red-600"}`}
          >
            {message.text}
          </p>
        )}

        {shortLink && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg break-words">
            <h3 className="font-bold mb-2">Link rút gọn:</h3>
            <a
              href={shortLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline break-words"
            >
              {shortLink}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
