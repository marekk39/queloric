"use client";

import { useEffect } from "react";
import Script from "next/script";

const infoItems = [
  { label: "Response time", value: "Within a few hours", sub: "Same day on most days" },
  { label: "Quote turnaround", value: "Same day", sub: "Detailed scope and fixed price" },
  { label: "Typical delivery", value: "2–5 business days", sub: "Depends on complexity" },
  { label: "Payment", value: "Stripe, bank transfer or crypto", sub: "Card · IBAN · USDT, USDC, BTC, ETH" },
];

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "10px 14px",
  border: "1px solid var(--border)", borderRadius: 8,
  fontFamily: "inherit", fontSize: 14,
  color: "var(--q-dark)", background: "var(--background)",
  outline: "none", WebkitAppearance: "none",
  transition: "border-color .15s",
};

export default function Contact() {
  useEffect(() => {
    const form = document.getElementById("contactForm");
    if (!form) return;

    const handler = async (e: Event) => {
      const detail = (e as CustomEvent).detail;
      try {
        await fetch("/api/contact-notify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: detail.name,
            email: detail.email,
            service: detail.service,
            budget: detail.budget,
            message: detail.message,
          }),
        });
      } catch {}
    };

    form.addEventListener("pageclip-submit", handler);
    return () => form.removeEventListener("pageclip-submit", handler);
  }, []);

  return (
    <>
      <Script src="https://s.pageclip.co/v1/pageclip.js" strategy="lazyOnload" />

      <section
        id="contact"
        style={{ padding: "96px 0", background: "var(--surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
      >
        <div style={{ maxWidth: 1060, margin: "0 auto", padding: "0 48px" }}>
          <span className="reveal" style={{ fontSize: 12, fontWeight: 600, color: "var(--accent)", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 14, display: "block" }}>
            Get in touch
          </span>
          <h2 className="reveal reveal-delay-1" style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 700, lineHeight: 1.12, letterSpacing: "-.025em", color: "var(--q-black)", marginBottom: 0 }}>
            Tell us what you need. <span style={{ color: "var(--accent)" }}>We&apos;ll handle the rest.</span>
          </h2>

          {/* Quote banner */}
          <div
            className="reveal reveal-delay-2"
            style={{
              background: "var(--q-accent-light)",
              border: "1px solid var(--accent)",
              borderRadius: 12, padding: "32px 40px", marginTop: 52,
              display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap",
            }}
          >
            <div>
              <h3 style={{ color: "var(--accent)", marginBottom: 6, fontSize: 17, fontWeight: 600 }}>Want a faster, more detailed quote?</h3>
              <p style={{ fontSize: 14, color: "var(--q-mid)", margin: 0 }}>Answer a few quick questions and get a personalised estimate in 60 seconds.</p>
            </div>
            <a
              href="/quote"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 26px", borderRadius: 8, fontSize: 15, fontWeight: 500, textDecoration: "none", background: "var(--accent)", color: "#fff", whiteSpace: "nowrap" }}
            >
              Get instant quote →
            </a>
          </div>

          {/* Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start", marginTop: 48 }} className="contact-grid">
            {/* Form */}
            <div>
              <form
                id="contactForm"
                action="https://send.pageclip.co/rUdgox3XHfWA6ZrLbQLhinYuhAEvD7Tl"
                className="pageclip-form"
                method="post"
              >
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }} className="form-row-grid">
                  <div style={{ marginBottom: 14 }}>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--q-dark)", marginBottom: 6 }}>Your name</label>
                    <input style={inputStyle} type="text" name="name" placeholder="John Smith" required className="contact-input" />
                  </div>
                  <div style={{ marginBottom: 14 }}>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--q-dark)", marginBottom: 6 }}>Email address</label>
                    <input style={inputStyle} type="email" name="email" placeholder="john@company.com" required className="contact-input" />
                  </div>
                </div>
                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--q-dark)", marginBottom: 6 }}>Service needed</label>
                  <select style={inputStyle} name="service" required className="contact-input">
                    <option value="" disabled>Select a service...</option>
                    <option>Website Design &amp; Development</option>
                    <option>AI Chatbot</option>
                    <option>Telegram / Discord Bot</option>
                    <option>Workflow Automation</option>
                    <option>Website Management</option>
                    <option>SEO &amp; Content</option>
                    <option>API / Backend Development</option>
                    <option>Something else</option>
                  </select>
                </div>
                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--q-dark)", marginBottom: 6 }}>Budget range (optional)</label>
                  <select style={inputStyle} name="budget" className="contact-input">
                    <option value="" disabled>Select a range...</option>
                    <option>Under 100€</option>
                    <option>100–300€</option>
                    <option>300–600€</option>
                    <option>600–1,000€</option>
                    <option>1,000+€</option>
                    <option>Not sure yet</option>
                  </select>
                </div>
                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--q-dark)", marginBottom: 6 }}>Tell us about your project</label>
                  <textarea
                    style={{ ...inputStyle, minHeight: 120, resize: "vertical" }}
                    name="message"
                    placeholder="Describe what you need, your timeline, requirements and any reference links..."
                    required
                    className="contact-input"
                  />
                </div>
                <button
                  type="submit"
                  className="pageclip-form__submit"
                  style={{
                    width: "100%", display: "flex", alignItems: "center", justifyContent: "center",
                    gap: 8, padding: "12px 26px", borderRadius: 8, fontSize: 15, fontWeight: 500,
                    background: "var(--accent)", color: "#fff", border: "none",
                    cursor: "pointer", fontFamily: "inherit", transition: "all .15s",
                  }}
                >
                  <span>Send message →</span>
                </button>
                <p style={{ fontSize: 13, color: "var(--q-muted)", marginTop: 10 }}>
                  We&apos;ll send a fixed-price quote within a few hours. No commitment required.
                </p>
              </form>
            </div>

            {/* Info */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              {infoItems.map((item) => (
                <div key={item.label} style={{ padding: "18px 0", borderBottom: "1px solid var(--border)" }}>
                  <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--accent)", marginBottom: 5 }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: 15, color: "var(--q-dark)" }}>{item.value}</div>
                  <div style={{ fontSize: 13, color: "var(--q-muted)", marginTop: 2 }}>{item.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .contact-input:focus {
          border-color: var(--accent) !important;
          box-shadow: 0 0 0 3px rgba(79,70,229,.1);
        }
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 44px !important; }
          .form-row-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
