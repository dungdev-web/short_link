// hooks/useBackgroundGlow.ts
import { useEffect } from "react";

export function useBackgroundGlow() {
  useEffect(() => {
    const bg = document.querySelector(".background-glow");
    const handleMouseMove = (e: MouseEvent) => {
      if (bg) {
        bg.style.background = `radial-gradient(circle at ${e.clientX}px ${e.clientY}px, rgba(135,206,250,0.4) 0%, transparent 10%)`;
      }
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);
}
