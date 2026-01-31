// src/app/components/CampaignForm.tsx
"use client";

import React from "react";
import { Campaign } from "@/types/Campaign";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faBullseye } from "@fortawesome/free-solid-svg-icons";

interface CampaignFormProps {
  form: Partial<Campaign>;
  errors: Partial<Record<keyof Campaign, string>>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onSubmit: () => void;
}

export default function CampaignForm({ form, errors, onChange, onSubmit }: CampaignFormProps) {
  return (
    <div className="bg-white border border-gray-200 p-8 mb-10">
      <h2
        className="text-2xl font-semibold mb-6 text-center flex items-center justify-center gap-2"
        style={{ color: "#0092DA" }}
      >
        <FontAwesomeIcon icon={faBullseye} /> Tạo Chiến dịch Marketing
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-700">
        {/* Tên chiến dịch */}
        <div className="md:col-span-3">
          <label className="block text-sm font-semibold mb-1">
            Tên chiến dịch <span className="text-gray-400 text-xs">| Bắt buộc</span>
          </label>
          <input
            type="text"
            name="name"
            value={form.name || ""}
            onChange={onChange}
            placeholder="VD: Sale Mùa Hè"
            className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 transition ${
              errors.name ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-[#0092DA]"
            }`}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        {/* Mô tả */}
        <div className="md:col-span-3">
          <label className="block text-sm font-semibold mb-1">
            Mô tả <span className="text-gray-400 text-xs">| Chi tiết chiến dịch</span>
          </label>
          <textarea
            name="description"
            value={form.description || ""}
            onChange={onChange}
            placeholder="Chi tiết chiến dịch..."
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-[#0092DA] transition"
          />
        </div>

        {/* Ngày bắt đầu */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Ngày bắt đầu <span className="text-gray-400 text-xs">* Bắt buộc</span>
          </label>
          <input
            type="date"
            name="start_date"
            value={form.start_date || ""}
            onChange={onChange}
            className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 transition ${
              errors.start_date ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-[#0092DA]"
            }`}
          />
          {errors.start_date && <p className="text-red-500 text-xs mt-1">{errors.start_date}</p>}
        </div>

        {/* Ngày kết thúc */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Ngày kết thúc <span className="text-gray-400 text-xs">* Bắt buộc</span>
          </label>
          <input
            type="date"
            name="end_date"
            value={form.end_date || ""}
            onChange={onChange}
            className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 transition ${
              errors.end_date ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-[#0092DA]"
            }`}
          />
          {errors.end_date && <p className="text-red-500 text-xs mt-1">{errors.end_date}</p>}
        </div>

        {/* Ngân sách */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Ngân sách (VNĐ) <span className="text-gray-400 text-xs">| Tùy chọn</span>
          </label>
          <input
            type="text"
            name="budget"
            value={form.budget ?? ""}
            onChange={onChange}
            placeholder="VD: 1000000"
            className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 transition ${
              errors.budget ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-[#0092DA]"
            }`}
          />
          {errors.budget && <p className="text-red-500 text-xs mt-1">{errors.budget}</p>}
        </div>

        {/* Nút submit */}
        <div className="md:col-span-3 pt-4">
          <button
            onClick={onSubmit}
            className="w-full text-white font-semibold py-3 rounded transition duration-200 flex items-center justify-center gap-2"
            style={{ backgroundColor: "#0092DA" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#007bbd")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0092DA")}
          >
            <FontAwesomeIcon icon={faPlus} />
            Tạo chiến dịch
          </button>
        </div>
      </div>
    </div>
  );
}
