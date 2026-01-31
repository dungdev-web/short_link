// app/profile/layout.tsx
"use client";

import "../globals.css";
import { useEffect, useState } from "react";
import { useBackgroundGlow } from "@/hooks/useBackgroundGlow";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import MobileMenu from "./components/MobileMenu";
import ProfileMenu from "./components/ProfileMenu";
import { clearUserFromLocalStorage, getUserFromLocalStorage } from "@/hooks/authStorage";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);;
  const [userId, setUserId] = useState<string | null>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useBackgroundGlow();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const { username, email, userId } = getUserFromLocalStorage();
    setName(username);
    setEmail(email);
    setUserId(userId);
    }
  }, []);
  const handleLogout = () => {
    clearUserFromLocalStorage()
    setUserId(null);
    window.location.href = "/login";
  };
  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-100 background-glow">
      <MobileMenu isOpen={isMobileMenuOpen} onClose={toggleMobileMenu} />
      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
        onLogout={handleLogout}
      />
      <div className="flex">
        <Sidebar></Sidebar>
        <main className="flex-1 md:pl-64">
          {children}
          <div className="bg-gray-50 text-center text-base text-gray-600 py-4 border-t border-gray-200">
            Copyright© MMS CORP Company. All Reserved.
          </div>
        </main>
      </div>
    </div>
  );
}
