// hooks/useCampaignValidation.ts

import { Campaign } from "@/types/Campaign";

export type CampaignForm = Pick<
  Campaign,
  | "name"
  | "description"
  | "start_date"
  | "end_date"
  | "budget"
>;

export const validateCampaignField = (
  name: keyof CampaignForm,
  value: string | number | null
): string => {
  const isEmpty = (val: string | number | null) =>
    val === null || (typeof val === "string" && !val.trim());

  const requiredDateFields: (keyof CampaignForm)[] = [
    "start_date",
    "end_date",
  ];

  if (requiredDateFields.includes(name)) {
    if (isEmpty(value)) return "Ngày không được để trống";
    return "";
  }

  switch (name) {
    case "name":
      if (isEmpty(value)) return "Tên chiến dịch không được để trống";
      if ((value as string).length < 6)
        return "Tên chiến dịch phải có ít nhất 6 ký tự";
      return "";

    case "budget":
      if (value !== null && Number(value) < 0)
        return "Ngân sách không được là số âm";
      return "";

    default:
      return "";
  }
};

export const validateCampaignForm = (
  form: CampaignForm
): Partial<Record<keyof CampaignForm, string>> => {
  const errors: Partial<Record<keyof CampaignForm, string>> = {};

  (Object.keys(form) as (keyof CampaignForm)[]).forEach((key) => {
    const error = validateCampaignField(key, form[key]);
    if (error) errors[key] = error;
  });

  if (
    form.start_date &&
    form.end_date &&
    new Date(form.start_date) > new Date(form.end_date)
  ) {
    errors.end_date = "Ngày kết thúc phải sau ngày bắt đầu";
  }


  return errors;
};
