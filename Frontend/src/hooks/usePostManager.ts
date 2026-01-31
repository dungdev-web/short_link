// hooks/usePostManager.ts
import { useEffect, useState } from "react";
import { getPosts, deletePost, updatePost } from "@/services/postService";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { IPost } from "@/types/IPost";

export const usePostManager = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const data = await getPosts();
      setPosts(data);
    } catch (e: any) {
      setError(e.message || "Lỗi khi tải bài đăng");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Bạn có chắc chắn?",
      text: "Hành động này sẽ xóa bài đăng!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    });

    if (result.isConfirmed) {
      try {
        await deletePost(id);
        setPosts(prev => prev.filter(p => p.id !== id));
        toast.success("Xóa bài đăng thành công!");
      } catch (error: any) {
        toast.error(error.message || "Lỗi khi xóa bài đăng");
      }
    }
  };

  const handleUpdate = async (id: number, data: Partial<IPost>) => {
    const updated = await updatePost(id, data);
    setPosts(prev => prev.map(p => (p.id === id ? updated : p)));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    loading,
    error,
    fetchPosts,
    handleDelete,
    handleUpdate,
  };
};
