// src/app/hooks/useCampaignForm.ts
import { useState } from "react";
import { Campaign } from "@/types/Campaign";
import { validateCampaignForm } from "@/hooks/useCampaignValidation";

export function useCampaignForm(initialState: Partial<Campaign> = {}) {
  const [form, setForm] = useState<Partial<Campaign>>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof Campaign, string>>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    const newValue = name === "budget" ? Number(value) : value;

    setForm((prev) => ({ ...prev, [name]: newValue }));

    const validationErrors = validateCampaignForm({ ...form, [name]: newValue });
    setErrors(validationErrors);
  };

  const validate = () => {
    const validationErrors = validateCampaignForm(form);
    setErrors(validationErrors);
    return validationErrors;
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

  return {
    form,
    errors,
    handleChange,
    validate,
    resetForm,
    setForm,
    setErrors,
  };
}
