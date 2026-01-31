"use client";

import { API_BASE_URL } from "@/config/env";
import { getUserFromLocalStorage } from "@/hooks/authStorage";
import { useVisitTracker } from "@/hooks/useVisitTracker";

import { validateField } from "@/hooks/validate";
import { getInfoUser, updateInfoUser } from "@/services/authService";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState("/images/default.png");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ phoneNumber?: string }>({});

  const fetchUser = async () => {
    const { token, userId } = getUserFromLocalStorage();
    if (token && userId) {
      try {
        const user = await getInfoUser(userId);
        setName(user.full_name || "");
        setEmail(user.email || "");
        setPhone(user.phone_number || "");
        setAddress(user.address || "");
        setAvatar(
          user.avatar_url
            ? user.avatar_url.startsWith("http")
              ? user.avatar_url
              : `${API_BASE_URL}/uploads/${user.avatar_url}`
            : `/images/default.png`
        );
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
        toast.error("Không thể tải thông tin người dùng.");
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      fetchUser();
    }

  }, []);

  const handleSave = async () => {
    const phoneError = validateField({
      name: "phoneNumber",
      value: phoneNumber,
      formType: "register",
    });

    if (phoneError) {
      setErrors({ phoneNumber: phoneError });
      toast.error("Vui lòng kiểm tra lại thông tin!");
      return;
    }

    try {
      const { token, userId } = getUserFromLocalStorage();
      if (!token || !userId) {
        toast.error("Không tìm thấy thông tin người dùng.");
        return;
      }

      const updateData: any = {
        full_name: name,
        phone_number: phoneNumber,
        address: address,
      };

      if (avatarFile) {
        updateData.avatar = avatarFile;
      } else if (avatar) {
        updateData.avatar_url = avatar.replace(`${API_BASE_URL}/uploads/`, "");
      }

      await updateInfoUser(userId, updateData);
      toast.success("Cập nhật thông tin thành công!");

      await fetchUser();
      setAvatarFile(null);
      setErrors({});
    } catch (error: any) {
      toast.error(error?.message || "Đã xảy ra lỗi khi cập nhật.");
    }

  };

  return (
    <div className="flex">
      <main className="flex-1 p-8">
        <nav className="text-sm text-gray-600 mb-4 space-x-2">
          <a href="#" className="hover:underline text-black">
            Trang chủ
          </a>
          <span>&gt;</span>
          <a href="#" className="hover:underline text-black">
            Tài khoản
          </a>
          <span>&gt;</span>
          <span className="text-gray-500">Thông tin cá nhân</span>
        </nav>

        <h1 className="text-2xl font-bold mb-6">Thông tin cá nhân</h1>

        <div className="space-y-4 max-w-xl">
          <div className="flex items-center space-x-4">
            <img
              src={avatar}
              className="w-20 h-20 rounded-full border object-cover"
              alt="Avatar"
            />
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setAvatarFile(file);
                    setAvatar(URL.createObjectURL(file));
                  }
                }}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Tên</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              readOnly
              className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm p-2 text-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
            <input
              type="tel"
              name="phoneNumber"
              value={phoneNumber}
              onChange={(e) => {
                const value = e.target.value;
                setPhone(value);
                const error = validateField({
                  name: "phoneNumber",
                  value,
                  formType: "register",
                });
                setErrors((prev) => ({ ...prev, phoneNumber: error }));
              }}

              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-200"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Địa chỉ</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-200"
            />
          </div>

          <button
            onClick={handleSave}
            className="px-4 py-2 bg-[#0092DA] text-white rounded hover:bg-[#24a6df] transition"
          >
            Lưu
          </button>
        </div>
      </main>
      <ToastContainer />
    </div>
  );
}
