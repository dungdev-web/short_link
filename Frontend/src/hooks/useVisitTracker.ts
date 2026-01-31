import { useEffect } from "react";

function getUserIdFromLocalStorage(): number | null {
  const mockUserStr = localStorage.getItem("mockUsers");
  if (mockUserStr) {
    try {
      const mockUser = JSON.parse(mockUserStr);
      return mockUser?.id ?? null;
    } catch {}
  }

  const userIdStr = localStorage.getItem("userId");
  return userIdStr ? Number(userIdStr) : null;
}

function getUtmSource(params: URLSearchParams): string | null {
  const utmSource = params.get("utm_source");
  if (utmSource) return utmSource;

  const ref = document.referrer.toLowerCase();

  if (ref.includes("facebook.com")) return "facebook";
  if (ref.includes("zalo.me") || ref.includes("zaloapp")) return "zalo";
  if (ref.includes("instagram.com")) return "instagram";
  if (ref.includes("tiktok.com")) return "tiktok";
  if (ref.includes("x.com")) return "x";

  return null;
}

export const useVisitTracker = (options?: {
  userId?: number;
  mock?: boolean;
}) => {
  useEffect(() => {
    const startTime = Date.now();
    const params = new URLSearchParams(window.location.search);
    const userId = options?.userId ?? getUserIdFromLocalStorage();

    const path = window.location.pathname + window.location.search;

    const utm_source = getUtmSource(params);

    const referrer = document.referrer || null;
    const userAgent = navigator.userAgent;

    const initialData = {
      user_id: userId,
      path,
      referrer,
      utm_source,
      utm_medium: params.get("utm_medium") || null,
      utm_campaign: params.get("utm_campaign") || null,
      screen: `${window.innerWidth}x${window.innerHeight}`,
      user_agent: userAgent,
    };

    if (options?.mock) {
      console.log("[MOCK immediate visit log]", initialData);
      const logs = JSON.parse(localStorage.getItem("page_visit_logs") || "[]");
      logs.push({
        ...initialData,
        time_spent: 0,
        visited_at: new Date().toISOString(),
      });
      localStorage.setItem("page_visit_logs", JSON.stringify(logs));
    } else {
      fetch("http://localhost:3000/user/tracking/visit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...initialData, time_spent: 0 }),
      });
    }

    const handleBeforeUnload = () => {
      const duration = Math.round((Date.now() - startTime) / 1000);

      const data = {
        ...initialData,
        time_spent: duration,
        visited_at: new Date().toISOString(),
      };

      console.log("[SEND BEACON]", data);

      const blob = new Blob([JSON.stringify(data)], {
        type: "application/json",
      });
      navigator.sendBeacon("http://localhost:3000/user/tracking/visit", blob);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [options?.mock, options?.userId]);
};
