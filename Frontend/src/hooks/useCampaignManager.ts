import { useEffect, useState } from "react";
import {
  getCampaigns,
  deleteCampaign,
  updateCampaign,
  detachLinkFromCampaign,
} from "@/services/campaignService";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Campaign } from "@/types/Campaign";

export const useCampaignManager = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCampaigns = async () => {
    setLoading(true);
    try {
      const data = await getCampaigns();
      setCampaigns(data);
    } catch (e: any) {
      setError(e.message || "Lỗi khi tải chiến dịch");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Bạn có chắc chắn?",
      text: "Hành động này sẽ xóa chiến dịch!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    });

    if (result.isConfirmed) {
      try {
        await deleteCampaign(id);
        setCampaigns((prev) => prev.filter((c) => c.id !== id));
        toast.success("Xóa chiến dịch thành công!");
      } catch (error: any) {
        toast.error(error.message || "Lỗi khi xóa chiến dịch");
      }
    }
  };

  const handleUpdate = async (id: number, data: Partial<Campaign>) => {
    const updated = await updateCampaign(id, data);
    setCampaigns((prev) => prev.map((c) => (c.id === id ? updated : c)));
  };

  const handleDetachFromLink = async (
    campaignId: number,
    linkId: number,
    setLinks: React.Dispatch<React.SetStateAction<any[]>>
  ) => {
    const result = await Swal.fire({
      title: "Xác nhận",
      text: "Bạn có chắc chắn muốn tháo chiến dịch này khỏi link không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
    });

    if (!result.isConfirmed) return;

    try {
      await detachLinkFromCampaign(campaignId, linkId);
      setLinks((prev) =>
        prev.map((link) =>
          link.id === linkId
            ? {
                ...link,
                campaigns: link.campaigns?.filter((c) => c.id !== campaignId),
              }
            : link
        )
      );
      toast.success("Đã tháo chiến dịch khỏi link!");
    } catch (e: any) {
      toast.error(e.message || "Lỗi khi tháo chiến dịch");
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  return {
    campaigns,
    loading,
    error,
    fetchCampaigns,
    handleDelete,
    handleUpdate,
    handleDetachFromLink,
  };
};
