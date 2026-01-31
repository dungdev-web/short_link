"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { resetPassword } from "@/services/authService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validateField } from "@/hooks/validate"; 

export default function OTP() {
  const [otp, setOtp] = useState<string[]>(Array(6).fill("")); 
  const [newPassword, setNewPassword] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(600); 
  const [errors, setErrors] = useState<{ [key: string]: string }>({}); 
  const [otpValid, setOtpValid] = useState(false); 
  const router = useRouter(); 
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]); 

  useEffect(() => {
    const emailQuery = new URLSearchParams(window.location.search).get("email");
    if (emailQuery) {
      setEmail(emailQuery); 
    }
  }, []);
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleOtpChange = (index: number, value: string) => {

    if (!/^\d?$/.test(value)) return; 
    const arr = [...otp];
    arr[index] = value;
    setOtp(arr);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    const fullOtp = arr.join("");
    setOtpValid(fullOtp.length === 6);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number
  ) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
  };

  const handleChange = (name: string, value: string) => {
    if (name === "email") setEmail(value);
    if (name === "newPassword") setNewPassword(value);
    if (name === "otp") setOtp(value.split(""));

    const error = validateField({ name, value, formType: "register" });

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const validateForm = () => {
    const fullOtp = otp.join("");
    let isValid = true;

    const emailError = validateField({
      name: "email",
      value: email,
      formType: "register",
    });
    const passwordError = validateField({
      name: "password",
      value: newPassword,
      formType: "register",
    });
    const otpError = fullOtp.length !== 6 ? "OTP phải gồm 6 chữ số" : "";

    setErrors({
      email: emailError,
      password: passwordError,
      otp: otpError,
    });

    if (emailError || passwordError || otpError) {
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return; 


    setLoading(true);
    try {
      const fullOtp = otp.join("");
      await resetPassword(email, fullOtp, newPassword);
      toast.success("Đổi mật khẩu thành công! Đang chuyển hướng...");
      setTimeout(() => router.push("/login"), 2000);
    } catch (err: any) {
      toast.error(err.message || "Có lỗi xảy ra khi đổi mật khẩu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4 py-10 bg-white">
      <div className="w-full max-w-[400px] bg-white rounded-[16px] p-10 text-center shadow">
        <img
          src="https://mmsgroup.vn/img/logo.svg"
          alt="MMS Logo"
          className="w-[160px] mb-6 mx-auto"
        />
        <h1 className="text-[22px] font-semibold mb-4">Xác thực tài khoản</h1>
        <p className="text-[15px] text-[#444] mb-4">
          Nhập OTP gửi tới email <strong>{email}</strong> và đặt mật khẩu mới.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex justify-center gap-3">
            {otp.map((digit, i) => (
              <input
                key={i}
                type="text"
                maxLength={1}
                inputMode="numeric"
                value={digit}
                onChange={(e) => handleOtpChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                ref={(el) => (inputRefs.current[i] = el)}
                className={`w-[45px] h-[50px] text-center text-[24px] border rounded-md ${
                  otpValid ? "border-green-500" : "border-red-500"
                }`}
              />
            ))}
          </div>
          {errors.otp && <p className="text-red-500 text-sm">{errors.otp}</p>}

          <input
            type="email"
            value={email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="Nhập email đã đăng ký"
            className="w-full p-3 border border-gray-300 rounded-md"
            disabled
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}

          <input
            type="password"
            value={newPassword}
            onChange={(e) => handleChange("newPassword", e.target.value)}
            placeholder="Nhập mật khẩu mới"
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          {errors.newPassword && (
            <p className="text-red-500 text-sm">{errors.newPassword}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition"
          >
            {loading ? "Đang xử lý..." : "Xác nhận"}
          </button>

          <p className="text-sm text-gray-500 mt-4">
            Mã OTP sẽ hết hạn sau:{" "}
            <span className="font-semibold text-[rgb(0,146,218)]">
              {countdown}s
            </span>
          </p>
        </form>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
}
