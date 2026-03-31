"use client";

import { useState } from "react";
import { sendAffiliateToDiscord } from "@/app/actions/sendToDiscord";

const steps = [
  { num: "1", title: "Apply below", desc: "Fill in a quick form. We review every application personally and respond within 24 hours." },
  { num: "2", title: "Share your link", desc: "You get a unique referral link and access to your own dashboard. Share it anywhere." },
  { num: "3", title: "Collect commissions", desc: "Earn 15% on every closed project. Hit 10 referrals and the next 5 pay 20%." },
];

const stats = [
  { value: "15%", label: "Base commission", color: "var(--accent)" },
  { value: "20%", label: "After 10 referrals", color: "#16a34a" },
  { value: "40€", label: "Minimum payout", color: "var(--q-black)" },
  { value: "72h", label: "Payout window", color: "var(--q-black)" },
];

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "10px 14px",
  border: "1px solid var(--border)", borderRadius: 8,
  fontFamily: "inherit", fontSize: 14,
  color: "var(--q-dark)", background: "var(--background)",
  outline: "none", transition: "border-color .15s",
};

export default function AffiliateSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [how, setHow] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    const result = await sendAffiliateToDiscord({ name, email, how });
    setStatus(result.success ? "success" : "error");
  }

  return (
    <section
      id="partners"
      style={{ padding: 0, background: "var(--background)", position: "relative", overflow: "hidden", borderTop: "1px solid var(--border)" }}
    >
      {/* Aurora background */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
        <div className="affiliate-aurora-layer" />
        <div className="affiliate-aurora-layer affiliate-aurora-layer-2" />
      </div>

      <div style={{ maxWidth: 1060, margin: "0 auto", padding: "88px 48px", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div className="reveal" style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--q-accent-light)", border: "1px solid var(--accent)", borderRadius: 20, padding: "6px 16px", marginBottom: 20 }}>
            <span style={{ fontSize: 12, color: "var(--accent)", fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase" }}>✦ Affiliate Program</span>
          </div>
          <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 700, lineHeight: 1.12, letterSpacing: "-.025em", color: "var(--q-black)", marginBottom: 14 }}>
            Refer a client. <span style={{ color: "var(--accent)" }}>Get paid.</span>
          </h2>
          <p style={{ color: "var(--q-mid)", maxWidth: 480, margin: "0 auto", fontSize: 16, lineHeight: 1.7 }}>
            Know a business that needs a website or AI chatbot? Send them our way — earn 15% on every project that closes.
          </p>
        </div>

        {/* Steps */}
        <div className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 48 }}>
          {steps.map((step) => (
            <div key={step.num} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: "28px 24px" }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--q-accent-light)", border: "1px solid var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "var(--accent)", marginBottom: 16 }}>
                {step.num}
              </div>
              <h3 style={{ fontSize: 16, marginBottom: 8, color: "var(--q-black)", fontWeight: 600 }}>{step.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.65, margin: 0, color: "var(--q-muted)" }}>{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 2, marginBottom: 48, borderRadius: 12, overflow: "hidden", border: "1px solid var(--border)" }}>
          {stats.map((stat, i) => (
            <div key={stat.label} style={{ background: "var(--surface)", padding: "24px 20px", textAlign: "center", borderLeft: i > 0 ? "1px solid var(--border)" : "none" }}>
              <div style={{ fontSize: 32, fontWeight: 700, color: stat.color, letterSpacing: "-.03em", lineHeight: 1, marginBottom: 6 }}>{stat.value}</div>
              <div style={{ fontSize: 12, color: "var(--q-muted)" }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Application form */}
        <div className="reveal" style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 48, maxWidth: 640, margin: "0 auto" }}>
          <h3 style={{ fontSize: 20, marginBottom: 8, textAlign: "center", color: "var(--q-black)", fontWeight: 600 }}>Apply to become an affiliate</h3>
          <p style={{ color: "var(--q-muted)", textAlign: "center", fontSize: 14, marginBottom: 28, lineHeight: 1.6 }}>
            No experience needed. We accept anyone with genuine motivation to refer clients.
          </p>

          {status === "success" ? (
            <div style={{ textAlign: "center", padding: "24px 0" }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>✓</div>
              <p style={{ color: "#16a34a", fontSize: 15, fontWeight: 500 }}>
                Application sent! We&apos;ll review and get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 12 }}>
                <input
                  style={inputStyle}
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="aff-input"
                />
              </div>
              <div style={{ marginBottom: 12 }}>
                <input
                  style={inputStyle}
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="aff-input"
                />
              </div>
              <div style={{ marginBottom: 12 }}>
                <textarea
                  style={{ ...inputStyle, minHeight: 80, resize: "vertical" }}
                  placeholder="How do you plan to find and refer clients?"
                  value={how}
                  onChange={(e) => setHow(e.target.value)}
                  required
                  className="aff-input"
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                style={{
                  width: "100%", display: "flex", alignItems: "center", justifyContent: "center",
                  padding: 14, borderRadius: 8, fontSize: 15, fontWeight: 500,
                  background: "var(--accent)", color: "#fff", border: "none",
                  cursor: status === "loading" ? "not-allowed" : "pointer",
                  fontFamily: "inherit", opacity: status === "loading" ? 0.7 : 1,
                  transition: "opacity .15s",
                }}
              >
                {status === "loading" ? "Sending..." : "Apply to affiliate program →"}
              </button>
              {status === "error" && (
                <p style={{ fontSize: 13, color: "#ef4444", marginTop: 12, textAlign: "center" }}>
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          )}

          <p style={{ fontSize: 12, color: "var(--q-muted)", textAlign: "center", marginTop: 16 }}>
            Paid via bank transfer or crypto (USDT, USDC, BTC, ETH)
          </p>
        </div>
      </div>

      <style>{`
        .aff-input:focus {
          border-color: var(--accent) !important;
          box-shadow: 0 0 0 3px rgba(79,70,229,.1);
        }
        @media (max-width: 768px) {
          .aff-steps-grid { grid-template-columns: 1fr !important; }
          .aff-stats-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
}
