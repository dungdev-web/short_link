import React from "react";
import { RegisterCredentials } from "@/types/RegisterCredentials";

interface Props {
  formData: RegisterCredentials;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  errors: Partial<RegisterCredentials>;
}

export default function RegisterForm({
  formData,
  onChange,
  onSubmit,
  errors,
}: Props) {
  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={onChange}
          placeholder="Tài Khoản"
          className="w-full px-4 py-2 border rounded-lg"
        />
        {errors.username && (
          <p className="text-red-500 text-sm mt-1">{errors.username}</p>
        )}
      </div>

      <div>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={onChange}
          placeholder="Họ và tên"
          className="w-full px-4 py-2 border rounded-lg"
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
        )}
      </div>

      <div>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={onChange}
          placeholder="Email"
          className="w-full px-4 py-2 border rounded-lg"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={onChange}
          placeholder="Số điện thoại"
          className="w-full px-4 py-2 border rounded-lg"
        />
        {errors.phoneNumber && (
          <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
        )}
      </div>

      <div>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={onChange}
          placeholder="Mật Khẩu"
          className="w-full px-4 py-2 border rounded-lg"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-[#0092DA] hover:bg-[#24a6df] text-white font-semibold py-2 rounded-lg"
      >
        Đăng ký ngay
      </button>
    </form>
  );
}
