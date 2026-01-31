import { Campaign } from "@/types/Campaign";
import { validateCampaignField } from "@/hooks/useCampaignValidation";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props {
  campaign: Campaign;
  onClose: () => void;
  onSubmit: (data: Partial<Campaign>) => void;
}

export default function CampaignEditModal({ campaign, onClose, onSubmit }: Props) {
  const [form, setForm] = useState<Partial<Campaign>>({
    name: campaign.name,
    description: campaign.description,
    start_date: campaign.start_date,
    end_date: campaign.end_date,
    status: campaign.status,
    budget: campaign.budget,
  });

  const [errors, setErrors] = useState<Record<string, string | null>>({});

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    const newValue = name === "budget" ? Number(value) : value;

    setForm(prev => {
      const updated = { ...prev, [name]: newValue };
      const error = validateCampaignField(name, newValue, updated);
      setErrors(prev => ({ ...prev, [name]: error }));
      return updated;
    });
  };

  const validateForm = (): boolean => {
    const fields = ["name", "start_date", "end_date", "budget"];
    let isValid = true;
    const newErrors: Record<string, string | null> = {};
    for (const field of fields) {
      const error = validateCampaignField(field, (form as any)[field], form);
      newErrors[field] = error;
      if (error) isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

// ❌ Đừng để ToastContainer trong modal nữa

const handleSubmit = () => {
  if (!validateForm()) return;

  onSubmit(form);
  toast.success("Cập nhật chiến dịch thành công!");

  setTimeout(() => {
    onClose();
  }, 500);
};


  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50" onClick={onClose}>
      <div className="bg-white rounded p-6 w-full max-w-lg" onClick={e => e.stopPropagation()}>
        <h2 className="text-xl font-semibold mb-4 text-center text-blue-600">
          Sửa Chiến dịch
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Tên chiến dịch *</label>
            <input
              type="text"
              name="name"
              value={form.name || ""}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-1 ${
                errors.name
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-400 focus:border-blue-400"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold mb-1">Mô tả</label>
            <textarea
              name="description"
              value={form.description || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Ngày bắt đầu *</label>
              <input
                type="date"
                name="start_date"
                value={form.start_date || ""}
                onChange={handleChange}
                className={`w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                  errors.start_date
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-400"
                }`}
              />
              {errors.start_date && (
                <p className="text-red-500 text-sm mt-1">{errors.start_date}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold mb-1">Ngày kết thúc *</label>
              <input
                type="date"
                name="end_date"
                value={form.end_date || ""}
                onChange={handleChange}
                className={`w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                  errors.end_date
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-400"
                }`}
              />
              {errors.end_date && (
                <p className="text-red-500 text-sm mt-1">{errors.end_date}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1">Ngân sách (VNĐ)</label>
            <input
              type="number"
              name="budget"
              value={form.budget || 0}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                errors.budget
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-400"
              }`}
            />
            {errors.budget && (
              <p className="text-red-500 text-sm mt-1">{errors.budget}</p>
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
