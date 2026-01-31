export const mockVisitLogger = (userId?: number) => {
  const startTime = Date.now();

  const path = window.location.pathname + window.location.search;

  const referrer = document.referrer || null;

  const screen = `${window.innerWidth}x${window.innerHeight}`;
  const userAgent = navigator.userAgent;
  const params = new URLSearchParams(window.location.search);

  const utm_source = params.get("utm_source");
  const utm_medium = params.get("utm_medium");
  const utm_campaign = params.get("utm_campaign");

  const saveMockLog = () => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);

    const logData = {
      id: crypto.randomUUID(),
      user_id: userId ?? null,
      path,
      referrer,
      utm_source,
      utm_medium,
      utm_campaign,
      time_spent: timeSpent,
      screen,
      user_agent: userAgent,
      ip_address: "127.0.0.1",
      visited_at: new Date().toISOString(),
    };

    console.log("[MOCK visit log]", logData);

    const logs = JSON.parse(localStorage.getItem("page_visit_logs") || "[]");
    logs.push(logData);
    localStorage.setItem("page_visit_logs", JSON.stringify(logs));
  };

  window.addEventListener("beforeunload", saveMockLog);

  return () => {
    window.removeEventListener("beforeunload", saveMockLog);
  };
};
