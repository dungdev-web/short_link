"use client";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useState, useRef, useEffect } from "react";
import {
  HiOutlineDotsHorizontal,
  HiOutlineDownload,
  HiOutlinePencilAlt,
  HiOutlineTrash,
} from "react-icons/hi";
import { FaHandSparkles } from "react-icons/fa";

const data = [
  { name: "Laptop", value: 146, color: "#06b6d4" },
  { name: "Máy tính bảng", value: 70, color: "#2563eb" },
  { name: "Điện thoại", value: 50, color: "#c7d2fe" },
  { name: "Không xác định", value: 14, color: "#f97316" },
];

export default function DeviceChartCard() {
  const [showMenu, setShowMenu] = useState(false);
  const [showImg, setShowImg] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const imgMenuRef = useRef<HTMLDivElement | null>(null);

  const total = data.reduce((acc, item) => acc + item.value, 0);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
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
    <div className="bg-white p-4 rounded shadow hover:shadow-md transition-shadow relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-medium text-gray-700">
          Số lần nhấp + số lần quét trên mỗi thiết bị
        </h2>

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

      {/* Chart and legend */}
      <div className="flex items-center gap-4">
        <div className="w-1/2 h-60 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                isAnimationActive={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => `${value} lượt`}
                contentStyle={{ fontSize: "14px" }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <p className="text-2xl font-semibold">{total}</p>
            <p className="text-xs text-gray-500">clicks + scans</p>
          </div>
        </div>

        <div className="w-1/2">
          <ul className="text-sm text-gray-600 space-y-1">
            {data.map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between px-2 py-1 rounded hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></span>
                  <span>{item.name}</span>
                </div>
                <span>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
