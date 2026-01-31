import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faQrcode,
  faArrowsRotate,
} from "@fortawesome/free-solid-svg-icons";

interface ShortenedUrlDisplayProps {
  shortenedUrl: string;
}

const ShortenedUrlDisplay: React.FC<ShortenedUrlDisplayProps> = ({
  shortenedUrl,
}) => {
  const [showQR, setShowQR] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(shortenedUrl);
  };

  const handleQRCode = () => {
    setShowQR(true);
  };

  const handleCloseQR = () => {
    setShowQR(false);
  };

  const handleRefresh = () => {
    window.location.reload(); // Làm mới trang
  };

  return (
    <>
      <div className="mt-8 w-full max-w-xl">
        <p className="text-gray-800 text-sm mb-2 font-semibold">
          🔗 Link đã rút gọn:
        </p>
        <div className="flex flex-col md:flex-row items-center gap-4  " >
          <input
            type="text"
            value={shortenedUrl}
            readOnly
            className="flex-1 text-base font-medium px-4 py-3 text-blue-600 focus:outline-none w-full bg-gray-100"
          />
          <div className="flex gap-2">
            {/* Copy Button */}
            <div className="relative group">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-xl shadow-sm transition"
                onClick={handleCopy}
              >
                <FontAwesomeIcon icon={faCopy} />
              </button>
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                Sao chép link
              </span>
            </div>

            {/* QR Code Button */}
            <div className="relative group">
              <button
                className="bg-green-400  hover:bg-green-600 text-white p-3 rounded-xl shadow-sm transition"
                onClick={handleQRCode}
              >
                <FontAwesomeIcon icon={faQrcode} />
              </button>
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                Hiển thị QR Code
              </span>
            </div>

            {/* Refresh Button */}
            <div className="relative group">
              <button
                className="bg-gray-600 hover:bg-gray-700 text-white p-3 rounded-xl shadow-sm transition"
                onClick={handleRefresh}
              >
                <FontAwesomeIcon icon={faArrowsRotate} />
              </button>
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                Tạo lại link
              </span>
            </div>
          </div>
        </div>
        <p className="mt-4 text-green-600 text-base font-semibold animate-pulse">
          🎉 Rút gọn thành công!
        </p>
      </div>

      {/* QR Code Popup */}
      {showQR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-none bg-black/50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm text-center">
            <p className="text-lg font-semibold text-gray-800 mb-4">Mã QR của bạn:</p>
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                shortenedUrl
              )}`}
              alt="QR Code"
              className="rounded-md border mx-auto"
            />
            <button
              onClick={handleCloseQR}
              className="mt-6 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ShortenedUrlDisplay;
