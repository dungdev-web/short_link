import React, { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

interface ShortenFormProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
  error: string;
}

const ShortenForm: React.FC<ShortenFormProps> = ({
  onSubmit,
  isLoading,
  error,
}) => {
  const [url, setUrl] = useState("");
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = await recaptchaRef.current?.getValue();
    if (!token) {
      alert("Vui lòng xác minh CAPTCHA.");
      return;
    }

    onSubmit(url);
    recaptchaRef.current?.reset();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-4 w-full max-w-xl"
    >
      <div className="flex w-full gap-2">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Nhập link dài tại đây..."
          className="border px-4 py-3 rounded w-full"
          disabled={isLoading}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="bg-[#0092DA] hover:bg-blue-700 text-white px-6 py-3 rounded whitespace-nowrap"
        >
          {isLoading ? "Đang rút gọn..." : "Rút gọn"}
        </button>
      </div>

      <ReCAPTCHA
        sitekey="6LdKby4rAAAAAEAp0b80WwCc17heoQ3sHT9TI4Pg"
        onChange={() => setCaptchaVerified(true)}
        ref={recaptchaRef}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
};

export default ShortenForm;
