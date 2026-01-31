// app/profile/posts/page.tsx
"use client";

import Link from "next/link";
import { ToastContainer } from "react-toastify";
import { ChevronRight } from "lucide-react";
import { usePostManager } from "@/hooks/usePostManager";
import PostCard from "@/app/profile/components/Post/PostCard";
import PostEditModal from "@/app/profile/components/Post/PostEditModal";
import { useState } from "react";
import Pagination from "../components/Pagination";
import { IPost } from "@/types/IPost";

export default function PostManagerPage() {
  const { posts, loading, error, handleDelete, handleUpdate } = usePostManager();
  const [editing, setEditing] = useState<IPost | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(posts.length / itemsPerPage);
  const paginatedPosts = posts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <main className="max-w-7xl mx-auto px-6 py-8 min-h-screen">
      <ToastContainer />
      <nav className="text-sm text-gray-600 mb-6">
        <ol className="flex items-center space-x-3">
          <li>
            <Link href="/" className="text-blue-600 hover:underline font-medium">
              Trang chủ
            </Link>
          </li>
          <li>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </li>
          <li className="text-gray-800 font-semibold">Quản lý bài đăng</li>
        </ol>
      </nav>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Danh sách bài đăng</h1>
        <Link
          href="/create-post"
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-600"
        >
          <span>Tạo bài đăng mới</span>
        </Link>
      </div>

      {loading && <p>Đang tải dữ liệu...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && posts.length === 0 && <p>Không có bài đăng nào.</p>}

      <div className="grid gap-3 md:grid-cols-2">
        {paginatedPosts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onEdit={() => setEditing(post)}
            onDelete={() => handleDelete(post.id)}
          />
        ))}
      </div>

      {editing && (
        <PostEditModal
          post={editing}
          onClose={() => setEditing(null)}
          onSubmit={(data) => {
            handleUpdate(editing.id, data);
            setEditing(null);
          }}
        />
      )}

      {totalPages > 1 && (
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}
    </main>
  );
}
