"use client";
import { useState, useRef, useEffect } from "react";
import {
  HiOutlineDotsHorizontal,
  HiOutlineDownload,
  HiOutlinePencilAlt,
  HiOutlineTrash,
} from "react-icons/hi";
import dynamic from "next/dynamic";
import { FaCalendarAlt, FaFilter, FaHandSparkles } from "react-icons/fa";
import DevicePieChart from "../components/Analytics/DevicePieChart";
import ClickChartCard from "../components/Analytics/ClickChartCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import ReferrerBarChart from "../components/Analytics/ReferrerBarChart";
import LocationTable from "../components/Analytics/LocationTable";
// import WorldClicksMap from "../components/Analytics/WorldClicksMap";
const WorldClicksMap = dynamic(
  () => import("@/app/profile/components/Analytics/WorldClicksMap"),
  { ssr: false }
);

export default function AnalyticsPage() {
  const [showMenu, setShowMenu] = useState(false);
  const [showImg, setShowImg] = useState(false);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const menuRef = useRef(null);
  const menuRef2 = useRef(null);
  const menuRef1 = useRef<HTMLDivElement | null>(null);
  const imgMenuRef = useRef<HTMLDivElement | null>(null);
  // Đóng khi click ngoài menu
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !(menuRef.current as any).contains(e.target)) {
        setOpen(false);
      }
      if (menuRef2.current && !(menuRef2.current as any).contains(e.target)) {
        setOpen2(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
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

  return (
    <div className="p-6 bg-[#f1f5f9] min-h-screen">
      <div className="bg-white p-4 rounded-xl shadow mb-4">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-1">Phân tích</h1>
            <div className="bg-[#e0fbff] text-sm text-[#1d4ed8] px-4 py-3 rounded-lg border border-[#bae6fd] mt-2 w-full">
              <strong className="block mb-1">✨ Xem trước miễn phí</strong>
              Sau đây là ví dụ về bảng thông tin Bitly Analytics mới của chúng
              tôi hiển thị dữ liệu mẫu.{" "}
              <a href="#" className="underline font-medium">
                Nâng cấp gói của bạn
              </a>{" "}
              để xem dữ liệu theo thời gian thực và có thể sử dụng báo cáo này.
            </div>
          </div>
        </div>

        {/* Bộ lọc và chọn ngày */}
        <div className="flex flex-wrap items-center gap-2 mt-6 z-10 relative">
          <div
            className="flex items-center gap-2 border border-gray-300 rounded px-3 py-2 bg-white text-sm shadow-sm pointer-events-auto cursor-not-allowed
"
          >
            <FaCalendarAlt className="text-gray-500" />
            <span>16/05/2025</span>
            <span>→</span>
            <span>22/05/2025</span>
          </div>

          <button
            className="flex items-center gap-2 border cursor-not-allowed
 border-gray-300 rounded px-3 py-2 bg-white text-sm shadow-sm hover:bg-gray-50 pointer-events-auto"
          >
            <FaFilter className="text-gray-500" />
            Thêm bộ lọc
          </button>

          <span className="text-sm text-gray-500 ml-2">
            Hiển thị dữ liệu từ tất cả các liên kết và mã QR
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Cột trái: 2 card dọc */}
        <div className="flex flex-col gap-4">
          {/* Card: Ngày có nhiều lượt nhấp */}
          <div className="bg-white p-4 rounded-xl shadow hover:shadow-md transition-shadow relative">
            <div className="flex justify-between items-start">
              <h2 className="text-lg font-semibold">
                Ngày có nhiều lượt nhấp và quét nhất
              </h2>
              <button
                onClick={() => setOpen(!open)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <HiOutlineDotsHorizontal className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="mt-4 text-center">
              <p className="text-2xl font-bold text-[#0f172a] truncate">
                ✨ Ngày 20 tháng 5 năm 2025
              </p>
              <p className="text-md mt-1">48 lần nhấp + quét</p>
              <p className="text-sm text-gray-500 mt-1">
                Ngày 16 tháng 5 - Ngày 22 tháng 5 năm 2025
              </p>
            </div>

            {open && (
              <div
                ref={menuRef}
                className="absolute top-10 right-3 bg-white border border-gray-200 shadow-xl rounded-lg w-64 z-50"
              >
                <div className="flex items-start gap-2 p-3 border-b border-gray-200 bg-blue-50 text-blue-700 text-sm">
                  <FaHandSparkles className="mt-1" />
                  <p>
                    <strong>Nâng cấp gói của bạn</strong> để xem dữ liệu và sử
                    dụng báo cáo này
                  </p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 text-sm w-full text-gray-700 hover:bg-gray-100 cursor-not-allowed">
                  <HiOutlinePencilAlt className="w-4 h-4" /> Để sửa đổi
                </button>
                <button className="flex items-center gap-2 px-4 py-2 text-sm w-full text-red-600 hover:bg-red-50 cursor-not-allowed">
                  <HiOutlineTrash className="w-4 h-4" /> XÓA BỎ
                </button>
              </div>
            )}
          </div>

          {/* Card: Nguồn giới thiệu */}
          <div className="bg-white p-4 rounded-xl shadow hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold">
                Click + scan trên mỗi trang web giới thiệu
              </h2>
              <div className="flex items-center gap-2">
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
                            Nâng cấp gói của bạn để xem dữ liệu và sử dụng báo
                            cáo này
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
                    <div className="absolute right-0 top-full mt-2 z-20 w-64 bg-white rounded-xl shadow-lg animate-fadeIn">
                      <div className="flex items-start gap-2 p-3 border-b border-gray-200 bg-blue-50 text-blue-700 text-sm">
                        <FaHandSparkles className="mt-1" />
                        <p>
                          <strong>Nâng cấp gói của bạn</strong> để xem dữ liệu
                          và sử dụng báo cáo này
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
            <ReferrerBarChart />
          </div>

          {/* Card: Location with the most clicks and scans */}
          <div className="bg-white p-4 rounded-xl shadow hover:shadow-md transition-shadow relative">
            <div className="flex justify-between items-start">
              <h2 className="text-lg font-semibold">
                Location with the most clicks and scans
              </h2>
              <button
                onClick={() => setOpen2(!open2)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <HiOutlineDotsHorizontal className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="mt-4 text-center">
              <p className="text-2xl font-bold text-[#0f172a] truncate flex items-center justify-center gap-2">
                <FontAwesomeIcon icon={faChartLine} className="w-6 h-6" />
                United States & Unite...
              </p>
              <p className="text-md mt-1 font-medium">205 Clicks + Scans</p>
              <p className="text-sm text-gray-500 mt-1">
                May 16 - May 22, 2025
              </p>
            </div>

            {open2 && (
              <div
                ref={menuRef2}
                className="absolute top-10 right-3 bg-white border border-gray-200 shadow-xl rounded-lg w-64 z-50"
              >
                <div className="flex items-start gap-2 p-3 border-b border-gray-200 bg-blue-50 text-blue-700 text-sm">
                  <FaHandSparkles className="mt-1" />
                  <p>
                    <strong>Nâng cấp gói của bạn</strong> để xem dữ liệu và sử
                    dụng báo cáo này
                  </p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 text-sm w-full text-gray-700 hover:bg-gray-100 cursor-not-allowed">
                  <HiOutlinePencilAlt className="w-4 h-4" /> Để sửa đổi
                </button>
                <button className="flex items-center gap-2 px-4 py-2 text-sm w-full text-red-600 hover:bg-red-50 cursor-not-allowed">
                  <HiOutlineTrash className="w-4 h-4" /> XÓA BỎ
                </button>
              </div>
            )}
          </div>

          {/* Card: Bản đồ lượt nhấp theo vị trí */}
          <div className="bg-white p-4 rounded-xl shadow hover:shadow-md transition-shadow w-full">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-sm font-medium text-gray-600">
                Clicks + scans by location
              </h2>
              <HiOutlineDotsHorizontal className="w-5 h-5 text-gray-500" />
            </div>
            <div className="w-full h-[500px]">
              {" "}
              {/* tùy chỉnh chiều cao bản đồ */}
              <WorldClicksMap />
            </div>
          </div>
        </div>

        {/* Cột phải: Biểu đồ Pie và nguồn giới thiệu */}
        <div className="flex flex-col gap-4">
          {/* Card: Biểu đồ Pie */}
          <div className="bg-white p-4 rounded-xl shadow hover:shadow-md transition-shadow">
            <DevicePieChart />
          </div>

             {/* Card: Line chart */}
          <ClickChartCard />
          {/* Card: Biểu đồ Pie */}
          <div className="bg-white p-4 rounded-xl shadow hover:shadow-md transition-shadow">
            <LocationTable />
          </div>
        </div>
      </div>
    </div>
  );
}
