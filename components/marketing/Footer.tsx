"use client";

import { useState, useEffect } from "react";

const links = [
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Work" },
  { href: "#how", label: "Process" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
  { href: "#partners", label: "Affiliate" },
  { href: "#contact", label: "Contact" },
];

function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cookies_ok")) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem("cookies_ok", "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="cookie-banner">
      <p style={{ fontSize: 13, color: "rgba(255,255,255,.7)", lineHeight: 1.5, margin: 0 }}>
        🍪 This site uses essential cookies to function properly. By continuing to browse you agree to their use.
      </p>
      <button
        onClick={accept}
        style={{
          background: "var(--accent)", color: "#fff", border: "none",
          borderRadius: 6, padding: "8px 20px", fontSize: 13, fontWeight: 500,
          cursor: "pointer", whiteSpace: "nowrap", fontFamily: "inherit",
          flexShrink: 0, transition: "opacity .15s",
        }}
      >
        Got it
      </button>
    </div>
  );
}

export default function Footer() {
  return (
    <>
      <footer
        style={{
          borderTop: "1px solid var(--border)",
          padding: "40px 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 20,
          background: "var(--background)",
        }}
      >
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "var(--q-black)" }}>
            Queloric<span style={{ color: "var(--accent)" }}>.</span>
          </div>
          <div style={{ fontSize: 13, color: "var(--q-muted)", marginTop: 2 }}>AI &amp; Web Development Agency</div>
        </div>

        <ul style={{ display: "flex", gap: 24, listStyle: "none", flexWrap: "wrap" }}>
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                style={{ fontSize: 13, color: "var(--q-muted)", textDecoration: "none", transition: "color .15s" }}
                className="footer-link"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div style={{ fontSize: 13, color: "var(--q-muted)" }}>© 2026 Queloric. All rights reserved.</div>
      </footer>

      <CookieBanner />

      <style>{`
        .footer-link:hover { color: var(--accent) !important; }
        @media (max-width: 768px) {
          footer { flex-direction: column; align-items: flex-start; padding: 32px 20px; }
          .cookie-banner { flex-direction: column; padding: 16px 20px; text-align: center; }
        }
      `}</style>
    </>
  );
}
