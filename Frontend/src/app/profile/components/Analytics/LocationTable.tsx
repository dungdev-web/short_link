"use client";

import { useEffect, useRef, useState } from "react";
import { FaHandSparkles } from "react-icons/fa";
import { HiOutlineDotsHorizontal, HiOutlineDownload, HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";

const ITEMS_PER_PAGE = 10;

const countryData = [
  { country: "Hoa Kỳ", clicks: 205, percent: "38,1" },
  { country: "Nhật Bản", clicks: 6, percent: "1,1" },
  { country: "Mêhicô", clicks: 19, percent: "3,5" },
  { country: "Liên bang Nga", clicks: 5, percent: "0,9" },
  { country: "Ấn Độ", clicks: 27, percent: "5" },
  { country: "Canada", clicks: 80, percent: "14,9" },
  { country: "Vương quốc Anh", clicks: 205, percent: "38,1" },
  { country: "Pháp", clicks: 80, percent: "14,9" },
  { country: "Đức", clicks: 80, percent: "14,9" },
  { country: "Tây Ban Nha", clicks: 80, percent: "14,9" },
  { country: "Hàn Quốc", clicks: 45, percent: "8,3" },
  { country: "Úc", clicks: 34, percent: "6,2" },
  { country: "Ý", clicks: 29, percent: "5,3" },
  { country: "Thái Lan", clicks: 22, percent: "4,1" },
  { country: "Việt Nam", clicks: 18, percent: "3,3" },
  { country: "Trung Quốc", clicks: 50, percent: "9,3" },
  { country: "Brazil", clicks: 42, percent: "7,8" },
  { country: "Argentina", clicks: 17, percent: "3,1" },
  { country: "Nam Phi", clicks: 13, percent: "2,4" },
  { country: "Hà Lan", clicks: 20, percent: "3,7" },
];

const cityData = [
  { country: "San Francisco", clicks: 18, percent: "3.3" },
  { country: "Austin", clicks: 24, percent: "4.5" },
  { country: "New York", clicks: 63, percent: "11.7" },
  { country: "Tokyo", clicks: 6, percent: "1.1" },
  { country: "Sonora", clicks: 4, percent: "0.7" },
  { country: "Cancun", clicks: 15, percent: "2.8" },
  { country: "Vancouver", clicks: 62, percent: "11.5" },
  { country: "Toronto", clicks: 28, percent: "5.2" },
  { country: "Paris", clicks: 40, percent: "7.4" },
  { country: "Berlin", clicks: 36, percent: "6.7" },
  { country: "London", clicks: 55, percent: "10.2" },
  { country: "Rome", clicks: 30, percent: "5.6" },
  { country: "Seoul", clicks: 33, percent: "6.1" },
  { country: "Sydney", clicks: 25, percent: "4.6" },
  { country: "Bangkok", clicks: 20, percent: "3.7" },
  { country: "Hà Nội", clicks: 18, percent: "3.3" },
  { country: "Beijing", clicks: 50, percent: "9.3" },
  { country: "São Paulo", clicks: 42, percent: "7.8" },
  { country: "Buenos Aires", clicks: 17, percent: "3.1" },
  { country: "Amsterdam", clicks: 20, percent: "3.7" },
];

export default function LocationTable() {
  const [showMenu, setShowMenu] = useState(false);
  const [showImg, setShowImg] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const imgMenuRef = useRef<HTMLDivElement | null>(null);
  const [tab, setTab] = useState<"country" | "city">("country");
  const [currentPage, setCurrentPage] = useState(1);

  const currentData = tab === "country" ? countryData : cityData;

  const totalPages = Math.ceil(currentData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = currentData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
      if (
        imgMenuRef.current &&
        !imgMenuRef.current.contains(event.target as Node)
      ) {
        setShowImg(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const changeTab = (newTab: "country" | "city") => {
    setTab(newTab);
    setCurrentPage(1); // Reset page when tab changes
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Nhấp chuột + quét theo vị trí</h2>
         <div className="flex items-center gap-2 relative">
          {/* Download button */}
          <div ref={imgMenuRef} className="relative">
            <button
              className="p-2 rounded hover:bg-gray-100 text-gray-500 transition-colors"
              onClick={() => setShowImg(!showImg)}
            >
              <HiOutlineDownload className="w-5 h-5" />
            </button>
            {showImg && (
              <div className="absolute right-0 top-full mt-2 z-20 w-64 bg-white rounded-xl shadow-lg border">
                <div className="px-4 py-3 bg-cyan-50 text-cyan-700 text-sm border-b border-cyan-100 rounded-t-xl">
                  <div className="flex gap-2 items-start">
                    <span className="text-cyan-400">✨</span>
                    <span>
                      Nâng cấp gói của bạn để xem dữ liệu và sử dụng báo cáo
                      này
                    </span>
                  </div>
                </div>
                <div className="py-2 text-sm text-gray-500">
                  {["CSV", "PNG", "JPEG", "PDF"].map((type) => (
                    <button
                      key={type}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-50 cursor-not-allowed"
                      disabled
                    >
                      Tải xuống {type}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Menu button */}
          <div ref={menuRef} className="relative">
            <button
              className="p-2 rounded hover:bg-gray-100 text-gray-500 transition-colors"
              onClick={() => setShowMenu(!showMenu)}
            >
              <HiOutlineDotsHorizontal className="w-5 h-5" />
            </button>
            {showMenu && (
              <div className="absolute right-0 top-full mt-2 z-20 w-64 bg-white rounded-xl shadow-lg  animate-fadeIn">
                <div className="flex items-start gap-2 p-3 border-b border-gray-200 bg-blue-50 text-blue-700 text-sm">
                  <FaHandSparkles className="mt-1" />
                  <p>
                    <strong>Nâng cấp gói của bạn</strong> để xem dữ liệu và sử
                    dụng báo cáo này
                  </p>
                </div>
                <button
                  disabled
                  className="flex items-center gap-2 px-4 py-2 text-sm w-full text-gray-700 hover:bg-gray-100 cursor-not-allowed"
                >
                  <HiOutlinePencilAlt className="w-4 h-4" />
                  Để sửa đổi
                </button>
                <button
                  disabled
                  className="flex items-center gap-2 px-4 py-2 text-sm w-full text-red-600 hover:bg-red-50 cursor-not-allowed"
                >
                  <HiOutlineTrash className="w-4 h-4" />
                  XÓA BỎ
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-gray-100 rounded-lg overflow-hidden text-sm mb-4 w-max">
        <button
          className={`px-4 py-1.5 ${
            tab === "country"
              ? "bg-white text-black font-semibold"
              : "text-gray-500"
          }`}
          onClick={() => changeTab("country")}
        >
          Quốc gia
        </button>
        <button
          className={`px-4 py-1.5 ${
            tab === "city"
              ? "bg-white text-black font-semibold"
              : "text-gray-500"
          }`}
          onClick={() => changeTab("city")}
        >
          Thành phố
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="py-2 pr-4 pl-1">#</th>
              <th className="py-2 pr-4">
                {tab === "country" ? "Quốc gia" : "Thành phố"}
              </th>
              <th className="py-2 pr-4">Nhấp chuột + quét</th>
              <th className="py-2">%</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-2 pr-4 pl-1 text-gray-400">
                  {startIndex + index + 1}
                </td>
                <td className="py-2 pr-4 font-medium text-black">
                  {item.country}
                </td>
                <td className="py-2 pr-4">{item.clicks}</td>
                <td className="py-2">{item.percent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end mt-4 text-sm text-gray-500 gap-1">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-2 py-1 rounded hover:bg-gray-100 disabled:text-gray-300"
        >
          {"<"}
        </button>
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-2 py-1 rounded ${
              currentPage === i + 1
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="px-2 py-1 rounded hover:bg-gray-100 disabled:text-gray-300"
        >
          {">"}
        </button>
      </div>
    </div>
  );
}
