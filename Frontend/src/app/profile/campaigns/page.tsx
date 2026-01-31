"use client";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import { ChevronRight } from "lucide-react";
import { useCampaignManager } from "@/hooks/useCampaignManager";
import CampaignCard from "@/app/profile/components/Campaign/CampaignCard";
import CampaignEditModal from "@/app/profile/components/Campaign/CampaignEditModal";
import { useState } from "react";
import { Campaign } from "@/types/Campaign";
import Pagination from "../components/Pagination";

export default function CampaignManagerPage() {
  const { campaigns, loading, error, handleDelete, handleUpdate } =
    useCampaignManager();
  const [editing, setEditing] = useState<Campaign | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(campaigns.length / itemsPerPage);
  const paginatedCampaigns = campaigns.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <main className="max-w-7xl mx-auto px-6 py-8 min-h-screen">
      <ToastContainer />
      <nav className="text-sm text-gray-600 mb-6">
        <ol className="flex items-center space-x-3">
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
          <li className="text-gray-800 font-semibold">Quản lý chiến dịch</li>
        </ol>
      </nav>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Danh sách chiến dịch
        </h1>
        <Link
          href="/campaigns"
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-600"
        >
          <span>Tạo chiến dịch mới</span>
        </Link>
      </div>

      {loading && <p>Đang tải dữ liệu...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && campaigns.length === 0 && <p>Không có chiến dịch nào.</p>}

      <div className="grid gap-3 md:grid-cols-3">
        {paginatedCampaigns.map((campaign) => (
          <CampaignCard
            key={campaign.id}
            campaign={campaign}
            onEdit={() => setEditing(campaign)}
            onDelete={() => handleDelete(campaign.id)}
          />
        ))}
      </div>

      {editing && (
        <CampaignEditModal
          campaign={editing}
          onClose={() => setEditing(null)}
          onSubmit={(data) => handleUpdate(editing.id, data)}
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
