"use client";

import { useEffect, useState } from "react";
import { Campaign } from "@/types/Campaign";
import { getCampaigns, createCampaign } from "@/services/campaignService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validateCampaignForm } from "@/hooks/useCampaignValidation";
import CampaignForm from "../components/CampaignForm";

export default function CampaignPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [form, setForm] = useState<Partial<Campaign>>({
    name: "",
    description: "",
    start_date: "",
    end_date: "",
    status: "active",
    budget: 0,
    user_id: null,
    owner_id: null,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Partial<Record<keyof Campaign, string>>>({});

  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns = async () => {
    setLoading(true);
    try {
      const data = await getCampaigns();
      setCampaigns(data);
    } catch (error: any) {
      toast.error(error.message || "Lỗi khi tải chiến dịch");
    } finally {
      setLoading(false);
    }
  };

const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => {
  const { name, value } = e.target;
  const updatedValue = name === "budget" ? Number(value) : value;

  const key = name as keyof Campaign;

  const updatedForm: Partial<Campaign> = {
    ...form,
    [key]: updatedValue,
  };

  setForm(updatedForm);

  const validationResult = validateCampaignForm(updatedForm);

  setErrors((prev) => ({
    ...prev,
    [key]: validationResult[key] || "",
  }));
};


  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      start_date: "",
      end_date: "",
      status: "active",
      budget: 0,
      user_id: null,
      owner_id: null,
    });
    setErrors({});
  };

  const handleSubmit = async () => {
    const validationErrors = validateCampaignForm({
      name: form.name || "",
      description: form.description || "",
      start_date: form.start_date || "",
      end_date: form.end_date || "",
      budget: form.budget ?? 0,
    
    });

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      toast.warn("Vui lòng sửa các lỗi trong form trước khi gửi.");
      return;
    }

    try {
      const created = await createCampaign({
        name: form.name!,
        description: form.description || "",
        start_date: form.start_date!,
        end_date: form.end_date!,
        status: form.status || "active",
        budget: form.budget ?? 0,
        user_id: form.user_id || null,
        owner_id: form.owner_id || null,

      });

      setCampaigns((prev) => [created, ...prev]);
      resetForm();
      toast.success("Chiến dịch đã được tạo thành công!");
    } catch (error: any) {
      toast.error(error.message || "Lỗi khi tạo chiến dịch");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 font-sans min-h-screen">
      <ToastContainer />
      <CampaignForm form={form} errors={errors} onChange={handleChange} onSubmit={handleSubmit} />
    </div>
  );
}
