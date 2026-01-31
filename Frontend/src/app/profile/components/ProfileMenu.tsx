"use client";

import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/config/env"; // Make sure to import the API base URL
import { getInfoUser } from "@/services/authService"; // Adjust the path to where the service is located

interface ProfileMenuProps {
  name: string;
  email: string;
  onLogout: () => void;
}

export default function ProfileMenu({ name, email, onLogout }: ProfileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null); // State for avatar

  useEffect(() => {
    const token = localStorage.getItem("token"); // Get token from localStorage
    const userId = localStorage.getItem("userId"); // Get user ID from localStorage
    if (token && userId) {
      // Fetch user information from the API
      getInfoUser(userId) // Call the service to get the user info
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

  return (
    <div className="relative z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 transition"
      >
        {/* Display avatar image */}
        <img
          src={avatar || "/images/default.png"}  // Use the avatar from state or fallback to default
          alt="User Avatar"
          className="w-8 h-8 rounded-full border object-cover"
        />
        <span className="hidden md:inline text-sm font-medium text-gray-800">
          {name}
        </span>
        <svg
          className={`hidden md:inline w-4 h-4 ml-1 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl ring-1 ring-gray-200 z-50">
          <div className="px-4 py-3 border-b">
            <p className="text-sm font-medium text-gray-800">{name}</p>
            <p className="text-xs text-gray-500 truncate">{email}</p>
          </div>
          <ul className="py-1">
            <li>
              <a
                href="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Hồ sơ
              </a>
            </li>
            <li>
              <button
                onClick={onLogout}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Đăng xuất
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
