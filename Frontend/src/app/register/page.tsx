"use client";

import Link from "next/link";
import { useState } from "react";
import RegisterForm from "@/app/components/RegisterForm";
import { registerUser } from "@/services/authService";
import { RegisterCredentials } from "@/types/RegisterCredentials";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validateField } from "@/hooks/validate";


export default function RegisterPage() {
  const [formData, setFormData] = useState<RegisterCredentials>({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    fullName: "",
  });

  const [errors, setErrors] = useState<Partial<RegisterCredentials>>({});

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    const errorMsg = validateField({ name, value, formType: "register" });
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Partial<RegisterCredentials> = {};
    let hasError = false;

    for (const field in formData) {
      const fieldName = field as keyof RegisterCredentials;
      const msg = validateField({ name: fieldName, value: formData[fieldName], formType: "register" });
      if (msg) {
        newErrors[fieldName] = msg;
        hasError = true;
      }
    }

    if (hasError) {
      setErrors(newErrors);
      Object.values(newErrors).forEach((msg) => msg && toast.error(msg));
      return;
    }

    try {
      await registerUser(formData);
      toast.success("Đăng ký thành công!");

      setFormData({
        username: "",
        email: "",
        password: "",
        phoneNumber: "",
        fullName: "",
      });

      setErrors({});

      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (err: any) {
      toast.error(err.message || "Đã xảy ra lỗi trong quá trình đăng ký");
    }
  };

  return (
    <main className="w-11/12 max-w-6xl mx-auto mt-10">
      <div className="flex flex-wrap items-center rounded-lg shadow-lg overflow-hidden">
        <div className="w-full p-10 md:w-1/2">
          <img
            src="https://static.vecteezy.com/system/resources/previews/016/071/197/non_2x/desktop-login-isometric-illustration-light-gradient-suitable-for-mobile-app-website-banner-diagrams-infographics-and-other-graphic-assets-vector.jpg"
            alt="Register illustration"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex-1 p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Đăng Ký Email
          </h2>
          <p className="text-gray-600 text-sm mb-6">
            Hãy đăng ký để được hưởng nhiều đặc quyền riêng dành cho bạn
          </p>

          <RegisterForm
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            errors={errors}
          />

          <h3 className="text-center my-4 text-sm text-gray-600">Hoặc</h3>

          <div className="flex items-center justify-center mt-4 border border-gray-300 rounded-lg p-2 cursor-pointer hover:bg-gray-50">
            <i className="fab fa-google text-red-500 mr-2"></i>
            <span className="text-gray-700 text-sm">Đăng nhập bằng Google</span>
          </div>

          <div className="text-center mt-6 text-sm text-gray-600">
            Bạn đã có tài khoản?{" "}
            <Link href="/login" className="text-green-500 hover:underline">
              Đăng nhập ngay
            </Link>
          </div>
        </div>
      </div>

      <ToastContainer />
    </main>
  );
}
