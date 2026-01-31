"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import ProfileMenu from "./ProfileMenu";
import { getUserFromLocalStorage } from "@/hooks/authStorage";

interface HeaderProps {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  onLogout: () => void;
}

export default function Header({ isMobileMenuOpen, toggleMobileMenu, onLogout }: HeaderProps) {
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const { username, email } = getUserFromLocalStorage();
      setName(username);
      setEmail(email);
    }
  }, []);

  const handleLogoClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault(); // Đang ở trang chủ -> ngăn reload
    } else {
      router.push("/"); // Nếu không thì điều hướng về home
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 flex justify-between items-center bg-white shadow-md px-6 py-4 z-50">
      <div className="flex items-center space-x-4">
        <button onClick={toggleMobileMenu} className="md:hidden">
          <FontAwesomeIcon
            icon={isMobileMenuOpen ? faTimes : faBars}
            className="text-[#0092DA] text-2xl"
          />
        </button>
        <a href="/" onClick={handleLogoClick} className="inline-block">
          <img
            src="/images/logo.jpg"
            alt="Logo"
            className="h-12 w-auto"
          />
        </a>
      </div>

      <div>
        <ProfileMenu name={name} email={email} onLogout={onLogout} />
      </div>
    </header>
  );
}