import { FaCalendarAlt, FaThumbtack, FaEdit, FaTrash } from "react-icons/fa";
import { IPost } from "@/types/IPost";

interface Props {
  post: IPost;
  onEdit: () => void;
  onDelete: () => void;
}

export default function PostCard({ post, onEdit, onDelete }: Props) {
  return (
    <div className="rounded p-5 bg-white shadow-sm flex flex-col justify-between hover:shadow-md transition">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-blue-700">{post.title}</h3>
        <p className="text-sm text-gray-600">{post.content}</p>
        <p className="text-sm text-gray-500 flex items-center gap-2">
          <FaCalendarAlt className="text-blue-500" />
          Đăng ngày: {post.created_at}
        </p>
        <p className="text-sm text-gray-500 flex items-center gap-2">
          <FaThumbtack className="text-red-500" />
          Trạng thái: {post.status}
        </p>
      </div>
      <div className="flex justify-end gap-4 mt-4">
        <button onClick={onEdit} className="text-blue-600 hover:text-blue-800"><FaEdit /></button>
        <button onClick={onDelete} className="text-red-600 hover:text-red-800"><FaTrash /></button>
      </div>
    </div>
  );
}
