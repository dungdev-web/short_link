// components/LoginModal.tsx
import React from "react";
import { useRouter } from "next/navigation";

export default function LoginModal({ onClose }: { onClose: () => void }) {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  backdrop-blur-none bg-black/50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">Bạn chưa đăng nhập</h2>
        <p className="mb-6">Vui lòng đăng nhập để sử dụng dịch vụ rút gọn link.</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleLogin}
            className="bg-[#0092DA] text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Đăng nhập
          </button>
          <button
            onClick={onClose}
            className="border bg-green-400 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
