"use client";

import {
  FaArrowRight,
  
} from "react-icons/fa";
import TrueFocus from "../components/TrueFocus";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchLinks } from "@/services/urlService";
import RecentUtilitiesTable from "../components/RecentUtilitiesTable";
import AccordionItem from "../components/AccordionItem";
import { getUserFromLocalStorage } from "@/hooks/authStorage";

export default function ControlPanel() {
  const [token, setToken] = useState<string | null>(null);
  const [links, setLinks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const page = 1;
  const limit = 5;

  useEffect(() => {
  const { userId } = getUserFromLocalStorage();
  if (userId) setToken(userId);
  else console.warn("Không tìm thấy token.");
}, []);


  useEffect(() => {
    if (!token) return;
    setLoading(true);
    setError(null);

    fetchLinks(token, page, limit)
      .then(({ links }) => {
        setLinks(links);
      })
      .catch(() => setError("Có lỗi xảy ra khi tải dữ liệu."))
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <main className="flex-1 px-8 ">
      <div className="bg-gradient-to-r from-[#0092DA] to-[#24a6df] text-white p-16">
        <TrueFocus
          sentence="Chào mừng đến với MMS Group"
          manualMode={false}
          blurAmount={2}
          borderColor="white"
          animationDuration={2}
          pauseBetweenAnimations={1}
        />
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mt-5 text-gray-900 mb-6">Tiện ích</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            href="/"
            className="bg-gradient-to-br from-green-50 to-white border border-green-200 rounded-2xl p-5 shadow-md hover:shadow-lg hover:scale-105 transform transition duration-300 hover:border-green-500 cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <img
                src="https://tse4.mm.bing.net/th?id=OIP.wQM0i4IWg6dbQ1dOmbJlQQHaE8&pid=Api&P=0&h=220"
                alt="Rút gọn link"
                className="w-20 h-20 rounded-xl object-cover shadow-sm"
              />
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  Rút gọn link
                </h3>
                <p className="text-3xl text-green-600 font-bold mt-1">2</p>
              </div>
              <FaArrowRight className="text-green-500 text-xl" />
            </div>
          </Link>

          <Link
            href="/"
            className="bg-gradient-to-br from-indigo-50 to-white border border-indigo-200 rounded-2xl p-5 shadow-md hover:shadow-lg hover:scale-105 transform transition duration-300 hover:border-indigo-500 cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <img
                src="https://cdn.sforum.vn/sforum/wp-content/uploads/2022/12/ma-qr-la-gi.jpg"
                alt="Tạo mã QR"
                className="w-20 h-20 rounded-xl object-cover shadow-sm"
              />
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  Tạo mã QR
                </h3>
                <p className="text-3xl text-indigo-600 font-bold mt-1">1</p>
              </div>
              <FaArrowRight className="text-indigo-500 text-xl" />
            </div>
          </Link>

          <Link
            href="/profile"
            className="bg-gradient-to-br from-indigo-50 to-white border border-indigo-200 rounded-2xl p-5 shadow-md hover:shadow-lg hover:scale-105 transform transition duration-300 hover:border-indigo-500 cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <img
                src="https://png.pngtree.com/png-clipart/20230504/original/pngtree-profile-flat-icon-png-image_9137861.png"
                alt="Tạo hồ sơ"
                className="w-20 h-20 rounded-xl object-cover shadow-sm"
              />
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  Cập nhật hồ sơ
                </h3>
              </div>
              <FaArrowRight className="text-indigo-500 text-xl" />
            </div>
          </Link>
        </div>
      </section>

      <section className="mb-8">
        {loading ? (
          <p className="text-gray-500">Đang tải dữ liệu...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : links.length === 0 ? (
          <p className="text-gray-500">Không có liên kết nào.</p>
        ) : (
          <RecentUtilitiesTable links={links} />
        )}
      </section>

      <section className="bg-white border border-gray-200 rounded-lg p-4 mb-8">
        <h2 className="text-xl font-semibold mb-4">Hướng dẫn sử dụng</h2>
        <AccordionItem
          title="Short link là gì? Cách tạo short link nhanh chóng"
          content="Short link hay rút gọn link đang rất được mọi người quan tâm..."
          moreContent="Short link giúp tiết kiệm không gian chia sẻ, thuận tiện trong tiếp thị, giúp theo dõi lượt click, và đặc biệt hữu ích khi chia sẻ trên mạng xã hội hoặc in ấn. Một số nền tảng miễn phí phổ biến gồm Bit.ly, TinyURL, Rebrandly,..."
        />

        <AccordionItem
          title="Hướng dẫn tạo mã QR code free nhanh gọn bằng Canvato"
          content="Mã QR, hay QR CODE miễn phí là công cụ quan trọng..."
          moreContent="Bạn có thể sử dụng Canvato để tạo mã QR với nhiều tuỳ chọn: URL, văn bản, danh bạ, email,... chỉ với vài bước đơn giản. Không cần tài khoản, miễn phí, và có thể tuỳ chỉnh màu sắc, logo, khung viền mã QR."
        />
      </section>
    </main>
  );
}
