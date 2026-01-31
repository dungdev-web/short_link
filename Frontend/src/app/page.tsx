"use client";
import { useState, useEffect } from "react";
import ShortenForm from "@/app/components/ShortenForm";
import ShortenedUrlDisplay from "@/app/components/ShortenedUrlDisplay";
import LoginModal from "@/app/components/LoginModal";
import Link from "next/link";
import { shortenUrl } from "@/services/urlService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUserFromLocalStorage } from "@/hooks/authStorage";

export default function Home() {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [shortenedUrl, setShortenedUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const { token, userId } = getUserFromLocalStorage();
  setToken(token);
  setUserId(userId);
    }
  }, []);

  const handleShorten = (url: string) => {
    if (!token || !userId) {
      toast.info("Bạn cần đăng nhập để rút gọn link");
      setShowLoginModal(true);
      return;
    }

    setIsLoading(true);
    shortenUrl(url, Number(userId), token)
      .then((shortUrl) => {
        setShortenedUrl(shortUrl);
        toast.success("Rút gọn thành công!");
      })
      .catch((err: any) => {
        const msg = err?.message || "Lỗi rút gọn link";
        toast.error(msg);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div className="relative py-10">
      <main className="flex flex-col items-center justify-center text-center p-6 mt-20 relative z-10">
        <h1 className="flex flex-col items-center justify-center text-center text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          <Link href="/" className="flex flex-col items-center gap-2">
            <img
              src="https://mmsgroup.vn/img/logo.svg"
              alt="Logo"
              className="h-12 w-auto mb-2"
            />
            <span className="whitespace-normal">
              Rút gọn link, thu gọn liên kết, short link miễn phí
            </span>
          </Link>
        </h1>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Rút gọn link nhanh chóng trên PC và điện thoại, kèm theo mã QR tiện
          lợi dễ dàng truy cập mọi lúc, mọi nơi.
        </p>

        <ShortenForm
          onSubmit={handleShorten}
          isLoading={isLoading}
          error="" 
        />

        {shortenedUrl && <ShortenedUrlDisplay shortenedUrl={shortenedUrl} />}
      </main>

      <ToastContainer position="top-right" autoClose={3000} />

      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </div>
  );
}
