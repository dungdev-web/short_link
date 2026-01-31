"use client";

import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import LinkItem from "../components/LinkItem";
import Pagination from "../components/Pagination";
import AttachCampaignModal from "../components/AttachCampaignModal";
import { fetchLinks } from "@/services/urlService";
import {
  getCampaigns,
  getAllCampaignLinks,
  attachLinkToCampaign,
  detachLinkFromCampaign,
} from "@/services/campaignService";
import { ILinkWithEmail } from "@/types/ILinkWithEmail";
import { Campaign, CampaignLink } from "@/types/Campaign";
import { getUserFromLocalStorage } from "@/hooks/authStorage";
import "react-toastify/dist/ReactToastify.css";
import { useCampaignManager } from "@/hooks/useCampaignManager";

export default function MyShortLink() {
  const [token, setToken] = useState<string | null>(null);
  const [links, setLinks] = useState<ILinkWithEmail[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [totalPages, setTotalPages] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLinkId, setSelectedLinkId] = useState<number | null>(null);
  const [campaignOptions, setCampaignOptions] = useState<Campaign[]>([]);
const { handleDetachFromLink } = useCampaignManager();


  useEffect(() => {
    if (typeof window !== "undefined") {
      const { userId } = getUserFromLocalStorage();
      if (userId) setToken(userId);
    }
  }, []);

  useEffect(() => {
    if (!token) return;
    (async () => {
      setLoading(true);
      try {
        const { links: rawLinks, totalPages } = await fetchLinks(
          token,
          page,
          limit
        );
        const allCLinks: CampaignLink[] = await getAllCampaignLinks();
        const allCampaigns: Campaign[] = await getCampaigns(token);
        const enriched = rawLinks.map((l: any) => {
          const relatedCL = allCLinks.filter((cl) => cl.link_id === l.id);
          const campaigns = allCampaigns.filter((c) =>
            relatedCL.some((cl) => cl.campaign_id === c.id)
          );
          return { ...l, campaigns };
        });
        setLinks(enriched as ILinkWithEmail[]);
        setTotalPages(totalPages);
      } catch (e: any) {
        toast.error(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [token, page]);

  const handleCopy = (shortUrl: string) => {
    navigator.clipboard
      .writeText(shortUrl)
      .then(() => toast.success("Đã sao chép liên kết rút gọn!"))
      .catch(() => toast.error("Sao chép thất bại!"));
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
  };

  const handleAttachClick = async (linkId: number) => {
    if (!token) {
      toast.warn("Bạn cần đăng nhập");
      return;
    }
    try {
      const campaigns = await getCampaigns(token);
      setCampaignOptions(campaigns);
      setSelectedLinkId(linkId);
      setModalOpen(true);
    } catch {
      toast.error("Không tải được danh sách chiến dịch");
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedLinkId(null);
  };

  const onAttachSuccess = (campaignId: number) => {
    if (!selectedLinkId) return;
    const campaign = campaignOptions.find((c) => c.id === campaignId);
    if (!campaign) return;
    setLinks((prev) =>
      prev.map((l) =>
        l.id === selectedLinkId
          ? { ...l, campaigns: [...(l.campaigns || []), campaign] }
          : l
      )
    );
    closeModal();
  };

const onDetach = (campaignId: number, linkId: number) => {
  handleDetachFromLink(campaignId, linkId, setLinks);
};
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <nav className="text-sm text-gray-600 mb-6">
        <ol className="flex items-center space-x-1 sm:space-x-3">
          <li>
            <Link
              href="/"
              className="text-blue-600 hover:underline font-medium"
            >
              Trang chủ
            </Link>
          </li>
          <li>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </li>
          <li className="text-gray-800 font-semibold">Rút gọn liên kết</li>
        </ol>
      </nav>

      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-900">
          Danh sách liên kết đã tạo
        </h1>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          <FaPlus />
          <span>Tạo liên kết mới</span>
        </Link>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Đang tải dữ liệu...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : links.length === 0 ? (
        <p className="text-center text-gray-500">Chưa có liên kết nào.</p>
      ) : (
        <div className="space-y-4">
          {links.map((link) => (
            <LinkItem
              key={link.id}
              link={link}
              onCopy={handleCopy}
              onAttach={() => handleAttachClick(link.id)}
              onDetach={(campaignId) => onDetach(campaignId, link.id)}
            />
          ))}
        </div>
      )}

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {modalOpen && selectedLinkId && token && (
        <AttachCampaignModal
          token={token}
          linkId={selectedLinkId}
          campaigns={campaignOptions}
          onClose={closeModal}
          onSuccess={onAttachSuccess}
        />
      )}
    </div>
  );
}
