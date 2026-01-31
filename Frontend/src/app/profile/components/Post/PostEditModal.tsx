import { IPost } from "@/types/IPost";
import { validatePostField } from "@/hooks/usePostValidation";
import { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  post: IPost;
  onClose: () => void;
  onSubmit: (data: Partial<IPost>) => void;
}

export default function PostEditModal({ post, onClose, onSubmit }: Props) {
  const [form, setForm] = useState<Partial<IPost>>({
    title: post.title,
    content: post.content,
    created_at: post.created_at,
  });

  const [errors, setErrors] = useState<Record<string, string | null>>({});

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setForm(prev => {
      const updated = { ...prev, [name]: value };
      const error = validatePostField(name, value, updated);
      setErrors(prev => ({ ...prev, [name]: error }));
      return updated;
    });
  };

  const validateForm = (): boolean => {
    const fields = ["title", "created_at"];
    let isValid = true;
    const newErrors: Record<string, string | null> = {};
    for (const field of fields) {
      const error = validatePostField(field, (form as any)[field], form);
      newErrors[field] = error;
      if (error) isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    onSubmit(form);
    toast.success("Cập nhật bài viết thành công!");
    setTimeout(() => {
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50" onClick={onClose}>
      <div className="bg-white rounded p-6 w-full max-w-lg" onClick={e => e.stopPropagation()}>
        <h2 className="text-xl font-semibold mb-4 text-center text-blue-600">
          Sửa Bài viết
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Tiêu đề *</label>
            <input
              type="text"
              name="title"
              value={form.title || ""}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-1 ${
                errors.title
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-400 focus:border-blue-400"
              }`}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold mb-1">Nội dung</label>
            <textarea
              name="content"
              value={form.content || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
              rows={4}
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Ngày đăng *</label>
            <input
              type="date"
              name="created_at"
              value={form.created_at || ""}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                errors.created_at
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-400"
              }`}
            />
            {errors.created_at && (
              <p className="text-red-500 text-sm mt-1">{errors.created_at}</p>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
          >
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  );
}
