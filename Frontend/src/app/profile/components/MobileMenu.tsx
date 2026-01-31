// MobileMenu.tsx
"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faQrcode,
  faSignature,
} from "@fortawesome/free-solid-svg-icons";

export default function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <>
      <div
        className={`absolute inset-0 z-10 bg-black opacity-50 ${isOpen ? "block" : "hidden"}`}
        onClick={onClose}
      ></div>

      <nav
        className={`md:hidden absolute top-0 left-0 bg-white w-72 h-full z-50 shadow-md py-4 transform transition-transform ease-in-out duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="text-2xl font-bold text-[#0092DA] flex justify-center w-full">
          <Link href="/" className="inline-block">
            <img
              src="https://mmsgroup.vn/img/logo.svg"
              alt="Logo công ty MMS"
              className="h-12 w-auto"
            />
          </Link>
        </div>
        <Link href="/profile" className="block px-6 py-2 text-gray-700 hover:text-[#0092DA]">
          <FontAwesomeIcon icon={faAddressCard} className="w-4 h-4" /> Hồ sơ
        </Link>
        <Link href="/dashboard" className="block px-6 py-2 text-gray-700 hover:text-[#0092DA]">
          <FontAwesomeIcon icon={faQrcode} className="w-4 h-4" /> Bảng điều khiển
        </Link>
    
      </nav>
    </>
  );
}
