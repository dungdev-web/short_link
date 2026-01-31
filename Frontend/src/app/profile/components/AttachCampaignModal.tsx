"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { attachLinkToCampaign } from "@/services/campaignService";
import { validateCampaignField } from "@/hooks/useCampaignValidation";

interface Campaign {
  id: number;
  name: string;
  end_date?: string; // cần thêm các field này nếu muốn validate đúng
  budget?: number;
}

interface AttachCampaignModalProps {
  token: string;
  linkId: number;
  campaigns: Campaign[];
  onClose: () => void;
  onSuccess: () => void;
}

export default function AttachCampaignModal({
  token,
  linkId,
  campaigns,
  onClose,
  onSuccess,
}: AttachCampaignModalProps) {
  const [selectedCampaignId, setSelectedCampaignId] = useState<number | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const validateSelectedCampaign = (): boolean => {
    if (!selectedCampaignId) {
      setValidationError("Vui lòng chọn chiến dịch.");
      return false;
    }

    const selected = campaigns.find((c) => c.id === selectedCampaignId);
    if (!selected) {
      setValidationError("Chiến dịch không tồn tại.");
      return false;
    }

    const errors = [
      validateCampaignField("end_date", selected.end_date ?? null),
      validateCampaignField("budget", selected.budget ?? null),
    ].filter(Boolean);

    if (errors.length > 0) {
      setValidationError(errors[0]);
      return false;
    }

    setValidationError(null);
    return true;
  };

  const handleAttach = async () => {
    if (!validateSelectedCampaign()) return;

    setLoading(true);
    try {
      await attachLinkToCampaign(selectedCampaignId!, linkId);
      toast.success("Gắn link vào chiến dịch thành công!", {
        autoClose: 2000,
        onClose: () => {
          onClose(); // đóng modal trước
         window.location.reload(); // reload trang sau khi đóng modal
        },
      });
    } catch (e: any) {
      toast.error(e.message || "Có lỗi xảy ra.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    Swal.fire({
      title: "Xác nhận",
      text: "Bạn có chắc muốn hủy bỏ thao tác này?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Tiếp tục",
    }).then((result) => {
      if (result.isConfirmed) {
        onClose();
      }
    });
  };

  return (
    <div
      className="fixed inset-0 backdrop-blur-none bg-black/50 flex justify-center items-center z-50"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-lg p-6 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-4">Gắn link vào chiến dịch</h2>

        {campaigns.length === 0 ? (
          <p>Chưa có chiến dịch nào. Vui lòng tạo chiến dịch trước.</p>
        ) : (
          <>
            <select
              className="w-full border border-gray-300 rounded px-3 py-2 mb-2"
              value={selectedCampaignId ?? ""}
              onChange={(e) => setSelectedCampaignId(Number(e.target.value))}
            >
              <option value="" disabled>
                Chọn chiến dịch
              </option>
              {campaigns.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            {validationError && (
              <p className="text-sm text-red-500 mb-3">{validationError}</p>
            )}
          </>
        )}

        <div className="flex justify-end gap-3">
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
            disabled={loading}
          >
            Hủy
          </button>
          <button
            onClick={handleAttach}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
            disabled={loading || campaigns.length === 0}
          >
            {loading ? "Đang gắn..." : "Gắn vào"}
          </button>
        </div>
      </div>
    </div>
  );
}
