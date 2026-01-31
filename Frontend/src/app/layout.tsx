"use client";

import "./globals.css";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useBackgroundGlow } from "@/hooks/useBackgroundGlow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import {
  faAddressCard,
  faLink,
  faQrcode,
  faSignature,
  faBars,
  faTimes,
  faRightFromBracket,
  faUser,
  faRightToBracket,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";
import HomeTrueFocus from "./components/HomeTrueFocus";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  clearUserFromLocalStorage,
  getUserFromLocalStorage,
} from "@/hooks/authStorage";
import { getInfoUser } from "@/services/authService";
import { API_BASE_URL } from "@/config/apiConfig";
import { useVisitTracker } from "@/hooks/useVisitTracker";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null); 

  useEffect(() => {
    const token = localStorage.getItem("token"); 
    const userId = localStorage.getItem("userId"); 
    if (token && userId) {
      getInfoUser(userId)
        .then((user) => {
          setAvatar(
            user.avatar_url
              ? user.avatar_url.startsWith("http")
                ? user.avatar_url
                : `${API_BASE_URL}/uploads/${user.avatar_url}`
              : `/images/default.png`
          );
        })
        .catch((error) => {
          console.error("Error fetching user info:", error);
        });
    }
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useBackgroundGlow();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const { userId, username } = getUserFromLocalStorage();
      setUserId(userId);
      setUsername(username);

    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target as Node)
      ) {
        setIsUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    clearUserFromLocalStorage()

    setUserId(null);
    setUsername(null); 
    window.location.href = "/login"; 
  };

  useEffect(() => {
    setHasMounted(true);
  }, []);
  const pathname = usePathname();
  const isProfileRoute = pathname.startsWith("/profile");
// useVisitTracker({ mock: false });

  return (
    <html lang="vi">
      <body>
        <div className="relative min-h-screen overflow-hidden bg-gray-100 pt-20 background-glow">
          {!isProfileRoute && (
            <div
              className={`absolute inset-0 z-10 bg-black opacity-50 ${
                isMobileMenuOpen ? "block" : "hidden"
              }`}
              onClick={toggleMobileMenu}
            ></div>
          )}
          {!isProfileRoute && (
            <header className="fixed top-0 left-0 right-0 flex justify-between items-center bg-white shadow-md px-6 py-4 z-50">
              <div className="text-2xl font-bold text-[#0092DA] flex justify-center w-full md:w-auto">
                <Link href="/" className="inline-block">
                  <img
                    src="/images/logo.jpg"
                    alt="Logo"
                    className="h-12 w-auto"
                  />
                </Link>
              </div>

              <nav className="hidden md:flex gap-6">
                {hasMounted && (
                  <HomeTrueFocus
                    sentence={
                      username
                        ? `Chào mừng ${username} đến với MMS Group`
                        : "Chào mừng bạn đến với MMS Group"
                    }
                    manualMode={false}
                    blurAmount={2}
                    borderColor="#24A6DF"
                    animationDuration={2}
                    pauseBetweenAnimations={1}
                  />
                )}
              </nav>

              <div className="hidden md:flex gap-4 relative">
                {userId ? (
                  <div className="relative" ref={userDropdownRef}>
                    <button
                      onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 shadow border-gray-300 rounded-3xl hover:bg-gray-100"
                    >
                      
                      <img
                        src={avatar || "/images/default.png"} 
                        alt="User Avatar"
                        className="w-8 h-8 rounded-full  object-cover"
                      />
                      <span>{username}</span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {isUserDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded shadow-lg z-50">
                        <Link
                          href="/profile"
                          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                        >
                          <FontAwesomeIcon icon={faAddressCard} />
                          Hồ sơ
                        </Link>
                        <Link
                          href="/profile/control"
                          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                        >
                          <FontAwesomeIcon icon={faQrcode} />
                          Bảng điều khiển
                        </Link>

                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-100"
                        >
                          <FontAwesomeIcon icon={faRightFromBracket} />
                          Đăng xuất
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="px-4 py-2 bg-[#0092DA] text-white rounded hover:bg-[#24a6df] transition-colors duration-300"
                    >
                      Đăng nhập
                    </Link>
                    <Link
                      href="/register"
                      className="px-4 py-2 border border-blue-600 text-[#0092DA] bg-white rounded hover:bg-blue-50 transition-colors duration-300"
                    >
                      Đăng ký ngay
                    </Link>
                  </>
                )}
              </div>

              <div className="md:hidden flex items-center">
                <button onClick={toggleMobileMenu}>
                  <FontAwesomeIcon
                    icon={isMobileMenuOpen ? faTimes : faBars}
                    className="w-14 h-14 text-[#0092DA] text-2xl absolute top-7 right-5"
                  />
                </button>
              </div>
            </header>
          )}

          {!isProfileRoute && (
            <nav
              className={`md:hidden absolute top-0 right-0 bg-white w-90 h-full z-50 shadow-md py-4 transform transition-transform ease-in-out duration-300 ${
                isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div className="text-2xl font-bold text-[#0092DA] flex justify-center w-full">
                <Link href="/" className="inline-block">
                  <img
                    src="https://mmsgroup.vn/img/logo.svg"
                    alt="Logo"
                    className="h-12 w-auto"
                  />
                </Link>
              </div>

              <Link
                className="block px-6 py-2 text-gray-700 hover:text-[#0092DA]"
                href={"/profile"}
              >
                <FontAwesomeIcon icon={faAddressCard} className="w-4 h-4" /> Hồ
                sơ
              </Link>
              <Link
                href="/profile/control"
                className="block px-6 py-2 text-gray-700 hover:text-[#0092DA]"
              >
                <FontAwesomeIcon icon={faQrcode} className="w-4 h-4" /> Bảng
                điều khiển
              </Link>

              <div>
                {userId ? (
                  <>
                    <button
                      onClick={handleLogout}
                      className="block px-6 py-2 text-gray-700 hover:text-[#0092DA]"
                    >
                      <FontAwesomeIcon
                        icon={faRightFromBracket}
                        className="w-4 h-4"
                      />{" "}
                      Đăng xuất
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="block px-4 py-2 text-gray-700 hover:text-[#0092DA]"
                    >
                      Đăng nhập
                    </Link>
                    <Link
                      href="/register"
                      className="block px-4 py-2 text-gray-700 hover:text-[#0092DA]"
                    >
                      Đăng ký ngay
                    </Link>
                  </>
                )}
              </div>
            </nav>
          )}
          <ToastContainer />
          {children}

          {!isProfileRoute && (
            <footer className="bg-white border-t border-gray-100 mt-16">
              <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-base text-gray-700 justify-items-center">
                <div>
                  <h4 className="text-[#0092DA] font-bold mb-4 text-lg">
                    Tiện ích
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 hover:text-[#24a6df]">
                      <FontAwesomeIcon
                        icon={faLink}
                        className="w-4 h-4 text-[#0092DA]"
                      />
                      Rút gọn link
                    </li>
                    <li className="flex items-center gap-2 hover:text-[#24a6df]">
                      <FontAwesomeIcon
                        icon={faQrcode}
                        className="w-4 h-4 text-[#0092DA]"
                      />
                      Tạo mã QR
                    </li>
                    <li className="flex items-center gap-2 hover:text-[#24a6df]">
                      <FontAwesomeIcon
                        icon={faSignature}
                        className="w-4 h-4 text-[#0092DA]"
                      />
                      Chữ ký Email
                    </li>
                    <li className="flex items-center gap-2 hover:text-[#24a6df]">
                      <FontAwesomeIcon
                        icon={faAddressCard}
                        className="w-4 h-4 text-[#0092DA]"
                      />
                      Danh thiếp điện tử
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-[#0092DA] font-bold mb-4 text-lg">
                    Điều khoản
                  </h4>
                  <ul className="space-y-3">
                    <li className="hover:text-[#24a6df]">Điều khoản sử dụng</li>
                    <li className="hover:text-[#24a6df]">Chính sách sử dụng</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-[#0092DA] font-bold mb-4 text-lg">
                    Về chúng tôi
                  </h4>
                  <ul className="space-y-3">
                    <li className="hover:text-[#24a6df]">Về MMS CORP</li>
                    <li className="hover:text-[#24a6df]">MMS miễn phí</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-[#0092DA] font-bold mb-4 text-lg">
                    Cộng đồng
                  </h4>
                  <ul className="space-y-3">
                    <li className="hover:text-[#24a6df]">Hướng dẫn sử dụng</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 text-center text-base text-gray-600 py-4 border-t border-gray-200">
                Copyright© MMS CORP Company. All Reserved.
              </div>
            </footer>
          )}
        </div>
      </body>
    </html>
  );
}
