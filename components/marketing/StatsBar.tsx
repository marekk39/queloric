"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { target: 50, suffix: "€", label: "Starting price" },
  { target: 5, suffix: " days", label: "Average delivery" },
  { target: 100, suffix: "%", label: "Code ownership" },
  { target: 24, suffix: "/7", label: "AI uptime" },
];

function useCountUp(target: number, triggered: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!triggered) return;
    let current = 0;
    const step = target / 50;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      setValue(Math.round(current));
      if (current >= target) clearInterval(timer);
    }, 30);
    return () => clearInterval(timer);
  }, [triggered, target]);
  return value;
}

function StatItem({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const [triggered, setTriggered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const value = useCountUp(target, triggered);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTriggered(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ textAlign: "center" }}>
      <span style={{ fontSize: 36, fontWeight: 700, color: "#fff", letterSpacing: "-.03em", lineHeight: 1, display: "block" }}>
        {value}{suffix}
      </span>
      <span style={{ fontSize: 13, color: "rgba(255,255,255,.65)", marginTop: 4, display: "block" }}>{label}</span>
    </div>
  );
}

export default function StatsBar() {
  return (
    <div style={{ background: "var(--accent)", padding: "32px 48px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
        {stats.map((s) => (
          <StatItem key={s.label} {...s} />
        ))}
      </div>
      <p style={{ textAlign: "center", color: "rgba(255,255,255,.45)", fontSize: 13, marginTop: 20, marginBottom: 0 }}>
        Trusted by businesses across Europe. Starting from 50€.
      </p>
    </div>
  );
}
