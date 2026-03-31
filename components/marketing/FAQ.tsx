"use client";

import { useState } from "react";

const faqs = [
  {
    q: "How does pricing work exactly?",
    a: "The ranges on this page are estimates. Every project is scoped individually and we send a fixed quote before any work starts. You know the exact price before you commit.",
  },
  {
    q: "Do I own the code after delivery?",
    a: "Yes, completely. Full source code is handed over on every project. You can host it anywhere, modify it, give it to another developer. Zero lock-in.",
  },
  {
    q: "What is the 20€ deposit for?",
    a: "Before we invest time building your preview, we ask for a small 20€ refundable deposit. This is fully deducted from your final price. If we can't deliver, the deposit is refunded in full.",
  },
  {
    q: "How do I pay?",
    a: "We accept Stripe (cards, Apple Pay, Google Pay), bank transfer (IBAN) or cryptocurrency (USDT, USDC, BTC or ETH). We provide an invoice for every project.",
  },
  {
    q: "How fast is delivery really?",
    a: "Most simpler projects deliver in 2–3 days. Standard websites and chatbots 3–5 days. Complex projects are scoped with a timeline agreed upfront.",
  },
  {
    q: "What AI model powers the chatbots?",
    a: "Claude AI by Anthropic — the most capable and accurate large language model for natural conversation. Real, helpful answers — not frustrating dead ends.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" style={{ padding: "96px 0" }}>
      <div className="reveal" style={{ maxWidth: 1060, margin: "0 auto", padding: "0 48px" }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: "var(--accent)", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 14, display: "block" }}>
          FAQ
        </span>
        <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 700, lineHeight: 1.12, letterSpacing: "-.025em", color: "var(--q-black)", marginBottom: 0 }}>
          Questions we hear a lot.
        </h2>

        <div style={{ marginTop: 52, borderTop: "1px solid var(--border)" }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ borderBottom: "1px solid var(--border)" }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: "100%", background: "none", border: "none",
                  padding: "22px 0", display: "flex", alignItems: "center",
                  justifyContent: "space-between", fontSize: 16, fontWeight: 500,
                  color: "var(--q-black)", cursor: "pointer", textAlign: "left",
                  gap: 20, fontFamily: "inherit",
                }}
              >
                {faq.q}
                <span
                  style={{
                    width: 22, height: 22, flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "transform .25s",
                    transform: open === i ? "rotate(45deg)" : "none",
                    color: open === i ? "#fff" : "var(--accent)",
                    fontSize: 22, lineHeight: 1,
                    border: "1px solid var(--border)", borderRadius: "50%",
                    background: open === i ? "var(--accent)" : "transparent",
                    borderColor: open === i ? "var(--accent)" : "var(--border)",
                  }}
                >
                  +
                </span>
              </button>
              <div
                style={{
                  maxHeight: open === i ? 300 : 0,
                  overflow: "hidden",
                  transition: "max-height .3s ease",
                }}
              >
                <p style={{ paddingBottom: 22, fontSize: 15, color: "var(--q-muted)", lineHeight: 1.7, margin: 0 }}>
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <p style={{ textAlign: "center", marginTop: 40, fontSize: 15, color: "var(--q-mid)" }}>
          Still have questions?{" "}
          <a
            href="#contact"
            style={{ color: "var(--accent)", fontWeight: 500, textDecoration: "none" }}
          >
            Get in touch →
          </a>
        </p>
      </div>
    </section>
  );
}
