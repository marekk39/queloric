"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const rotatingItems = [
  "🚀 Fast. Affordable. Professional.",
  "💡 AI-powered. Built for your business.",
  "⚡ Live in days. Not months.",
  "🌍 Serving clients across Europe.",
  "🤖 Powered by Claude AI — the best model.",
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setCurrent((c) => (c + 1) % rotatingItems.length);
    }, 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      style={{
        background: "var(--background)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {/* Grid background */}
      <div className="hero-grid-bg" />

      <div
        style={{
          padding: "140px 48px 100px",
          maxWidth: 800,
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Rotating text */}
        <div style={{ height: 28, marginBottom: 20, overflow: "hidden", position: "relative" }}>
          {rotatingItems.map((item, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: "100%",
                textAlign: "center",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: ".08em",
                textTransform: "uppercase",
                color: "var(--accent)",
                opacity: i === current ? 1 : 0,
                transform: i === current ? "translateY(0)" : "translateY(8px)",
                transition: "opacity .5s, transform .5s",
              }}
            >
              {item}
            </div>
          ))}
        </div>

        <h1
          style={{
            fontSize: "clamp(42px, 6vw, 68px)",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-.03em",
            color: "var(--q-black)",
            marginBottom: 22,
          }}
        >
          Your business deserves a{" "}
          <span
            style={{
              background: "linear-gradient(120deg,rgba(79,70,229,.14) 0%,rgba(79,70,229,.14) 100%) no-repeat 0 88%/100% 35%",
              display: "inline",
              color: "var(--q-black)",
            }}
          >
            great website
          </span>{" "}
          and smarter{" "}
          <span style={{ color: "var(--accent)" }}>automation.</span>
        </h1>

        <p
          style={{
            fontSize: 18,
            color: "var(--q-mid)",
            maxWidth: 520,
            margin: "0 auto 36px",
            lineHeight: 1.7,
          }}
        >
          Custom websites, AI chatbots, Telegram and Discord bots, and workflow automation — built fast, delivered in days, starting from 50€.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            href="/quote"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "14px 32px", borderRadius: 8, fontSize: 16, fontWeight: 600,
              textDecoration: "none", background: "var(--accent)", color: "#fff",
              transition: "all .15s",
            }}
          >
            Get an instant quote →
          </Link>
          <a
            href="#services"
            className="hero-outline-btn"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "14px 32px", borderRadius: 8, fontSize: 16, fontWeight: 600,
              textDecoration: "none", background: "transparent",
              color: "var(--q-black)", border: "1px solid var(--border)",
              transition: "border-color .15s, color .15s",
            }}
          >
            See what we build
          </a>
          <style>{`
            .hero-outline-btn:hover {
              border-color: var(--accent) !important;
              color: var(--accent) !important;
            }
          `}</style>
        </div>

        <p style={{ marginTop: 18, fontSize: 13, color: "var(--q-muted)" }}>
          Takes 60 seconds. No commitment required.
        </p>
      </div>
    </div>
  );
}
