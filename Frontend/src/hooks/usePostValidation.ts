// hooks/usePostValidation.ts

import { IPost } from "@/types/IPost";

export type PostForm = Pick<IPost, "title" | "content">;

export const validatePostField = (
  name: keyof PostForm,
  value: string | null
): string => {
  const isEmpty = (val: string | null) =>
    val === null || val.trim() === "";

  switch (name) {
    case "title":
      if (isEmpty(value)) return "Tiêu đề không được để trống";
      if ((value as string).length < 6)
        return "Tiêu đề phải có ít nhất 6 ký tự";
      return "";

    case "content":
      if (isEmpty(value)) return "Nội dung không được để trống";
      if ((value as string).length < 10)
        return "Nội dung phải có ít nhất 10 ký tự";
      return "";

    default:
      return "";
  }
};

export const validatePostForm = (
  form: PostForm
): Partial<Record<keyof PostForm, string>> => {
  const errors: Partial<Record<keyof PostForm, string>> = {};

  (Object.keys(form) as (keyof PostForm)[]).forEach((key) => {
    const error = validatePostField(key, form[key]);
    if (error) errors[key] = error;
  });

  return errors;
};
