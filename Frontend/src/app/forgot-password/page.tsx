"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { sendResetPassword } from "@/services/authService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validateField } from "@/hooks/validate";

export default function ForgotPassWord() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);

    const emailError = validateField({
      name: "email",
      value: value,
      formType: "forgotPassword",
    });

    setErrors((prevErrors) => ({
      ...prevErrors,
      email: emailError,
    }));
  };

  const handleSubmit = async () => {
    if (errors.email) {
      toast.error("Vui lòng nhập email hợp lệ.");
      return;
    }

    setLoading(true);

    try {
      await sendResetPassword(email);
      toast.success("OTP đã được gửi thành công!");
      router.push(`/otp?email=${encodeURIComponent(email)}`);
    } catch (err: any) {
      toast.error(err.message || "Có lỗi xảy ra.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat flex justify-center items-start p-10">
      <div className="w-full max-w-xl bg-white rounded-[18px] p-12 shadow-lg text-center">
        <img
          src="https://mmsgroup.vn/img/logo.svg"
          alt="MMS"
          className="w-[150px] object-contain mb-6 mx-auto"
        />

        <h1 className="text-3xl font-bold mb-6">Quên mật khẩu</h1>

        <p className="text-base leading-relaxed mb-8">
          Vui lòng nhập địa chỉ email bạn dùng để đăng ký tài khoản Canvato.
          Và bạn sẽ nhận được <b>OTP</b> xác thực để đổi mật khẩu mới.
        </p>

        <form className="text-left" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="email" className="font-semibold mb-2 block">
            Email đăng nhập
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleChange}
            placeholder="Nhập email"
            className="w-full text-base p-3 border border-gray-200 rounded-md mb-4 focus:outline-none focus:border-sky-500 transition"
            required
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading || errors.email} 
            className="w-full bg-sky-500 hover:bg-lime-400 text-white text-lg font-bold py-2 rounded-md transition"
          >
            {loading ? "Đang gửi..." : "Gửi OTP"}
          </button>
        </form>

        <a
          href="/login"
          className="inline-block mt-7 text-sky-500 font-semibold hover:underline"
        >
          Đăng nhập
        </a>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
}
