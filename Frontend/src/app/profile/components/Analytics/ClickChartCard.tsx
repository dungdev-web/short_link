"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { HiOutlineDotsHorizontal, HiOutlineDownload, HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import { useState, useRef, useEffect } from "react";
import { FaHandSparkles } from "react-icons/fa";
const data = [
  { date: "05/16", clicks: 34 },
  { date: "05/17", clicks: 40 },
  { date: "05/18", clicks: 10 },
  { date: "05/19", clicks: 39 },
  { date: "05/20", clicks: 48 },
  { date: "05/21", clicks: 5 },
  { date: "05/22", clicks: 20 },
];

export default function ClickChartCard() {
  const [showMenu, setShowMenu] = useState(false);
    const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Đóng khi click ngoài menu
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !(menuRef.current as any).contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="bg-white p-4 rounded-xl shadow hover:shadow-md transition-shadow relative">
      {/* Header */}
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-lg font-semibold">
          Nhấp chuột + quét theo thời gian
        </h2>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded hover:bg-gray-100 text-gray-500"  onClick={() => setShowMenu(!showMenu)}>
            <HiOutlineDownload className="w-5 h-5" />
          </button>
          <button
           onClick={() => setOpen(!open)}
            className="p-2 rounded hover:bg-gray-100 text-gray-500"
          >
            <HiOutlineDotsHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="clicks"
              stroke="#0ea5e9"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
       {/* Menu popup */}
            {open && (
              <div
                ref={menuRef}
                className="absolute top-10 right-3 bg-white border border-gray-200 shadow-xl rounded-lg w-64 z-50  
"
              >
                <div
                  className="flex items-start gap-2 p-3 border-b border-gray-200 bg-blue-50 text-blue-700 text-sm 
"
                >
                  <FaHandSparkles className="mt-1" />
                  <p>
                    <strong>Nâng cấp gói của bạn</strong> để xem dữ liệu và sử
                    dụng báo cáo này
                  </p>
                </div>
                <button
                  className="flex items-center gap-2 px-4 py-2 text-sm w-full text-gray-700 hover:bg-gray-100 cursor-not-allowed
"
                >
                  <HiOutlinePencilAlt className="w-4 h-4" /> Để sửa đổi
                </button>
                <button
                  className="flex items-center gap-2 px-4 py-2 text-sm w-full text-red-600 hover:bg-red-50 cursor-not-allowed
"
                >
                  <HiOutlineTrash className="w-4 h-4" /> XÓA BỎ
                </button>
              </div>
            )}
      {/* Popup menu */}
      {showMenu && (
        <div className="absolute right-2 top-12 z-10 bg-white rounded-xl shadow-lg w-64 border">
          <div className="px-4 py-3 bg-cyan-50 text-cyan-700 text-sm border-b border-cyan-100 rounded-t-xl">
            <div className="flex gap-2 items-start">
              <span className="text-cyan-400">✨</span>
              <span>
                Nâng cấp gói của bạn để xem dữ liệu và sử dụng báo cáo này
              </span>
            </div>
          </div>
          <div className="py-2 text-sm text-gray-500">
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-50 cursor-not-allowed"
              disabled
            >
              Xuất dữ liệu CSV
            </button>
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-50 cursor-not-allowed"
              disabled
            >
              Tải xuống hình ảnh PNG
            </button>
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-50 cursor-not-allowed"
              disabled
            >
              Tải xuống hình ảnh JPEG
            </button>
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-50 cursor-not-allowed"
              disabled
            >
              Tải xuống tài liệu PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
