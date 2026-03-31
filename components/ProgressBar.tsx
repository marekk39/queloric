"use client";

import { useEffect } from "react";

export default function ProgressBar() {
  useEffect(() => {
    const bar = document.getElementById("progress-bar");
    if (!bar) return;
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) bar.style.width = (window.scrollY / total) * 100 + "%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <div id="progress-bar" />;
}
