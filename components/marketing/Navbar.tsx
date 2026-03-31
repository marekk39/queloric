"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Work" },
  { href: "#how", label: "Process" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
  { href: "#partners", label: "Affiliate", accent: true },
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const sections = ["services", "projects", "how", "pricing", "faq", "partners", "contact"];
    const onScroll = () => {
      let current = "";
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 130) current = id;
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isDark = mounted && theme === "dark";

  const pillBg = isDark ? "rgba(15,15,15,.7)" : "rgba(255,255,255,.9)";
  const pillBorder = isDark ? "1px solid rgba(255,255,255,.1)" : "1px solid rgba(0,0,0,.1)";
  const toggleBg = isDark ? "rgba(30,30,30,.7)" : "rgba(255,255,255,.9)";
  const toggleBorder = isDark ? "1px solid rgba(255,255,255,.2)" : "1px solid rgba(0,0,0,.12)";

  function linkColor(href: string, accent?: boolean) {
    const id = href.slice(1);
    const isActive = activeSection === id;
    if (accent) return isActive ? "var(--accent)" : isDark ? "rgba(99,102,241,.85)" : "rgba(99,102,241,.85)";
    if (isActive) return isDark ? "#fff" : "#4f46e5";
    return isDark ? "rgba(255,255,255,.55)" : "rgba(15,15,15,.65)";
  }

  function linkBg(href: string) {
    const id = href.slice(1);
    const isActive = activeSection === id;
    if (!isActive) return "transparent";
    return isDark ? "rgba(99,102,241,.18)" : "rgba(79,70,229,.08)";
  }

  return (
    <>
      {/* Desktop nav */}
      <nav
        style={{
          position: "fixed", top: "20px", left: 0, right: 0, zIndex: 200,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 32px", pointerEvents: "none",
        }}
      >
        {/* Left: logo + dark toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", pointerEvents: "auto" }}>
          <Link
            href="/"
            style={{
              fontSize: "17px", fontWeight: 700, letterSpacing: "-.02em",
              color: isDark ? "#fff" : "#0f0f0f", textDecoration: "none", whiteSpace: "nowrap",
            }}
          >
            Queloric<span style={{ color: "#6366f1" }}>.</span>
          </Link>
          {mounted && (
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              aria-label="Toggle dark mode"
              style={{
                width: 34, height: 34, borderRadius: "50%",
                background: toggleBg, border: toggleBorder,
                cursor: "pointer", display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: 15,
                backdropFilter: "blur(10px)",
                color: isDark ? "#fff" : "#0f0f0f",
              }}
            >
              {isDark ? "☀️" : "🌙"}
            </button>
          )}
        </div>

        {/* Center: pill links */}
        <div
          className="hidden md:flex"
          style={{
            alignItems: "center", gap: "2px",
            background: pillBg, border: pillBorder,
            backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
            padding: "5px 6px", borderRadius: "40px", pointerEvents: "auto",
          }}
        >
          {navLinks.map((link) => (
            <div key={link.href} style={{ position: "relative" }}>
              <a
                href={link.href}
                style={{
                  fontSize: 13, fontWeight: link.accent ? 600 : 500,
                  color: linkColor(link.href, link.accent),
                  textDecoration: "none", padding: "7px 13px",
                  borderRadius: "30px", display: "block",
                  background: linkBg(link.href), whiteSpace: "nowrap",
                  transition: "color .15s, background .15s",
                }}
              >
                {link.label}
              </a>
            </div>
          ))}
        </div>

        {/* Right: CTA + hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", pointerEvents: "auto" }}>
          <Link
            href="/quote"
            className="hidden md:block"
            style={{
              background: "#4f46e5", color: "#fff", padding: "9px 20px",
              borderRadius: "30px", fontSize: 13, fontWeight: 600,
              textDecoration: "none", whiteSpace: "nowrap", border: "none",
            }}
          >
            Build something →
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
            className="flex md:hidden"
            style={{
              flexDirection: "column", gap: 4, cursor: "pointer", padding: 8,
              background: "rgba(15,15,15,.7)", border: "1px solid rgba(255,255,255,.15)",
              borderRadius: 10, backdropFilter: "blur(12px)",
            }}
          >
            <span style={{ display: "block", width: 18, height: 2, background: "rgba(255,255,255,.7)", borderRadius: 2 }} />
            <span style={{ display: "block", width: 18, height: 2, background: "rgba(255,255,255,.7)", borderRadius: 2 }} />
            <span style={{ display: "block", width: 18, height: 2, background: "rgba(255,255,255,.7)", borderRadius: 2 }} />
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed", top: 74, left: "50%", transform: "translateX(-50%)",
            background: "rgba(10,10,10,.96)", border: "1px solid rgba(255,255,255,.1)",
            borderRadius: 16, padding: 10, minWidth: 200, zIndex: 199,
            display: "flex", flexDirection: "column", gap: 2, backdropFilter: "blur(16px)",
          }}
        >
          {[...navLinks, { href: "#contact", label: "Contact" }].map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                fontSize: 14,
                color: (link as typeof navLinks[0]).accent ? "#6366f1" : "rgba(255,255,255,.7)",
                fontWeight: (link as typeof navLinks[0]).accent ? 600 : 400,
                textDecoration: "none", padding: "10px 14px", borderRadius: 10,
              }}
            >
              {link.label}{(link as typeof navLinks[0]).accent ? " ✦" : ""}
            </a>
          ))}
          <Link
            href="/quote"
            onClick={() => setMobileOpen(false)}
            style={{
              background: "#4f46e5", color: "#fff", textAlign: "center",
              marginTop: 4, padding: "10px 14px", borderRadius: 10,
              textDecoration: "none", fontSize: 14,
            }}
          >
            Build something →
          </Link>
        </div>
      )}
    </>
  );
}
