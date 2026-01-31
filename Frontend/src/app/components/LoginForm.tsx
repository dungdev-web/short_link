

// components/LoginForm.tsx
import React from "react";
import { LoginCredentials } from "@/types/LoginCredentials";

interface Props {
  formData: LoginCredentials;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  errors?: {
    email?: string;
    password?: string;
  };
}

export default function LoginForm({
  formData,
  onChange,
  onSubmit,
  errors = {},
}: Props) {
  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={onChange}
          placeholder="Tên đăng nhập hoặc Email"
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
            errors.email ? 'border-red-500 focus:ring-red-400' : 'focus:ring-green-400'
          }`}
        />
        {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
      </div>

      <div>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={onChange}
          placeholder="Mật khẩu"
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
            errors.password ? 'border-red-500 focus:ring-red-400' : 'focus:ring-green-400'
          }`}
        />
        {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-[#0092DA] hover:bg-[#24a6df] transition-colors text-white font-semibold py-2 rounded-lg"
      >
        Đăng nhập ngay
      </button>
    </form>
  );
}
