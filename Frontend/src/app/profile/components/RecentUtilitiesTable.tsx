"use client";
import { QRCodeSVG } from "qrcode.react";
import { FaCalendarAlt, FaEye } from "react-icons/fa";
import { ILinkWithEmail } from "@/types/ILinkWithEmail"; // ✅ Import dùng lại

interface Props {
  links: ILinkWithEmail[]; // ✅ Thay vì định nghĩa lại interface
}

const RecentUtilitiesTable = ({ links }: Props) => {
  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const downloadQR = (shortCode: string) => {
    const svg = document.getElementById(`qr-${shortCode}`) as SVGElement | null;
    if (!svg) return;
  
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);
  
    const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement("a");
    link.href = url;
    link.download = `qr-${shortCode}.svg`;
    link.click();
    URL.revokeObjectURL(url);
  };
  

  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Tiện ích đã tạo gần đây
      </h2>

      {/* Danh sách tiện ích */}
      <div className="grid gap-4">
        {links.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row md:items-center justify-between bg-white shadow-md rounded-lg p-4"
          >
            {/* QR bên trái */}
            <div className="flex justify-center md:justify-start mb-4 md:mb-0">
              <QRCodeSVG
                value={item.short_url}
                size={100}
                id={`qr-${item.short_code}`}
              />
            </div>

            {/* Nội dung bên phải */}
            <div className="flex-1 md:ml-6 space-y-1 text-center md:text-left">
              <p className="font-semibold text-gray-800">{item.email}</p>
              <a
                href={item.short_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline break-words"
              >
                {item.short_url}
              </a>
              <p className="text-sm text-gray-500 flex justify-center md:justify-start items-center gap-1">
                <FaCalendarAlt className="inline-block" />
                {formatDate(item.created_at)}
              </p>
              <p className="text-sm text-gray-500 flex justify-center md:justify-start items-center gap-1">
                <FaEye className="inline-block" />
                {item.click_count || 0} lượt truy cập
              </p>
            </div>

            {/* Nút tải QR */}
            <div className="mt-4 md:mt-0 md:ml-4">
              <button
                onClick={() => downloadQR(item.short_code)}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
              >
                Tải mã QR
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentUtilitiesTable;
