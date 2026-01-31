import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

const RedirectPage = () => {
  const { shortCode } = useParams();

  useEffect(() => {
    const redirect = async () => {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      const fingerprint = result.visitorId;

      try {
        const response = await fetch(`https://localhost:3000/link/${shortCode}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fingerprint }),
        });

        if (!response.ok) {
          throw new Error("Bạn đã truy cập link này rồi hoặc không được phép.");
        }

        const data = await response.json();
        window.location.href = data.originalUrl;
      } catch (err) {
        alert((err as Error).message);
      }
    };

    if (shortCode) redirect();
  }, [shortCode]);

  return (
    <div className="flex items-center justify-center h-screen text-xl font-semibold">
      Đang chuyển hướng...
    </div>
  );
};

export default RedirectPage;
