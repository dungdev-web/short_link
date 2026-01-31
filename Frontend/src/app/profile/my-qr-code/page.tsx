"use client";

import { useEffect, useState } from "react";
import { QRCodeList } from "../components/QRCodeList";
import { fetchLinks } from "@/services/urlService";
import { ChevronRight } from "lucide-react";
import Pagination from "../components/Pagination";
import { FaPlus } from "react-icons/fa";
import Link from "next/link";
import { getUserFromLocalStorage } from "@/hooks/authStorage";

export default function MyQRCode() {
  const [token, setToken] = useState<string | null>(null);
  const [links, setLinks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(3);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);

    if (typeof window !== "undefined") {
      const {userId} = getUserFromLocalStorage()
      if (userId) setToken(userId);
      else console.warn("Không tìm thấy token.");

      checkIsMobile();

      window.addEventListener("resize", checkIsMobile);

      return () => {
        window.removeEventListener("resize", checkIsMobile);
      };
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;
      setLoading(true);
      setError(null);
      
      fetchLinks(token, page, limit)
        .then(({ links, totalPages }) => {
          setLinks(links);
          setTotalPages(totalPages);
        })
        .catch((e: any) => {
          setError(e.message);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchData();
  }, [token, page, limit]);

  const handleCopy = (shortUrl: string) => {
    navigator.clipboard
      .writeText(shortUrl)
      .then(() => alert("Đã copy URL rút gọn!"))
      .catch(() => alert("Copy thất bại."));
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <nav className="text-sm text-gray-600 mb-6">
          <ol className="flex items-center space-x-2 sm:space-x-3">
            <li>
              <a href="/" className="text-blue-600 hover:underline font-medium">
                Trang chủ
              </a>
            </li>

            <li>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </li>

            <li className="text-gray-800 font-semibold">Quản lý mã QR</li>
          </ol>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-800">
            Liên kết rút gọn đã tạo
          </h1>
          <Link href="/" className="inline-flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
            <FaPlus />
            <span>Tạo liên kết mới</span>
          </Link>
        </div>

        {/* QR Code List */}
        <QRCodeList
          links={links}
          handleCopy={handleCopy}
          loading={loading}
          error={error}
          isMobile={isMobile}
        />

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </main>
  );
}
