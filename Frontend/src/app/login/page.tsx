"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import LoginForm from "@/app/components/LoginForm";
import { loginUser } from "@/services/authService";
import { LoginCredentials } from "@/types/LoginCredentials";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { saveUserToLocalStorage } from "@/hooks/authStorage";
import { validateField } from "@/hooks/validate";
import ReCAPTCHA from "react-google-recaptcha";

export default function LoginPage() {
  const [formData, setFormData] = useState<LoginCredentials>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  useEffect(() => {
    const savedCaptchaVerified = localStorage.getItem("captchaVerified");
    if (savedCaptchaVerified === "true") {
      setCaptchaVerified(true);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    const errorMsg = validateField({ name, value, formType: "login" });
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      email: validateField({
        name: "email",
        value: formData.email,
        formType: "login",
      }),
      password: validateField({
        name: "password",
        value: formData.password,
        formType: "login",
      }),
    };

    const hasErrors = Object.values(newErrors).some((msg) => msg !== "");

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    if (loginAttempts >= 4 && !captchaVerified) {
      toast.error("Vui lòng xác minh reCAPTCHA");
      return;
    }
    try {
      const data = await loginUser(formData);
      toast.success("Đăng nhập thành công!");
      saveUserToLocalStorage(data);

      setLoginAttempts(0);
      setCaptchaVerified(false);
      localStorage.setItem("captchaVerified", "false");

      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } catch (err: any) {
      const errorMessage =
        err?.message || "Đăng nhập thất bại, vui lòng thử lại";
      toast.error(errorMessage);
      setLoginAttempts((prev) => prev + 1);
      setCaptchaVerified(false);
      localStorage.setItem("captchaVerified", "false");
      recaptchaRef.current?.reset();
    }
  };

  return (
    <main className="w-11/12 max-w-6xl mx-auto mt-10">
      <div className="flex flex-wrap items-center rounded-lg shadow-lg overflow-hidden">
        <div className="w-1/2 hidden p-10 md:block">
          <img
            src="https://static.vecteezy.com/system/resources/previews/016/071/197/non_2x/desktop-login-isometric-illustration-light-gradient-suitable-for-mobile-app-website-banner-diagrams-infographics-and-other-graphic-assets-vector.jpg"
            alt="Login illustration"
            className="object-cover w-full h-full"
          />
        </div>

        <div className="flex-1 p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Đăng nhập</h2>
          <p className="text-gray-600 text-sm mb-6">
            Hãy đăng nhập để được hưởng đặc quyền riêng dành cho bạn
          </p>

          <LoginForm
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            errors={errors}
          />
          {loginAttempts >= 4 && !captchaVerified && (
            <div className="my-4">
              <ReCAPTCHA
                sitekey="6LdKby4rAAAAAEAp0b80WwCc17heoQ3sHT9TI4Pg"
                onChange={() => {
                  setCaptchaVerified(true);
                  localStorage.setItem("captchaVerified", "true");
                }}
                ref={recaptchaRef}
              />
            </div>
          )}

          <div className="text-right mt-2">
            <Link
              href="/forgot-password"
              className="text-sm text-green-500 hover:underline"
            >
              Quên mật khẩu?
            </Link>
          </div>

          <div className="flex items-center justify-center mt-4 border border-gray-300 rounded-lg p-2 cursor-pointer hover:bg-gray-50">
            <i className="fab fa-google text-red-500 mr-2" />
            <span className="text-gray-700 text-sm">Đăng nhập bằng Google</span>
          </div>

          <div className="text-center mt-6 text-sm text-gray-600">
            Bạn chưa có tài khoản?{" "}
            <Link href="/register" className="text-green-500 hover:underline">
              Đăng ký ngay
            </Link>
          </div>
        </div>
      </div>

    
      <ToastContainer />
    </main>
  );
}
