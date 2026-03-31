const steps = [
  {
    icon: "💬",
    num: "Step 01",
    title: "Tell us what you need",
    desc: "Fill in the quote form with your project details — goals, timeline and any reference sites. The more you share, the more accurate and tailored the plan will be.",
  },
  {
    icon: "🤝",
    num: "Step 02",
    title: "We discuss and agree",
    desc: "We get back within hours to discuss your project and agree on a clear plan. No vague estimates — you know exactly what you're getting before anything starts.",
  },
  {
    icon: "👁️",
    num: "Step 03",
    title: "Preview before you pay",
    desc: "A small 20€ refundable deposit lets us build a real preview for you to review and approve. The 20€ is deducted from your final price. If we can't deliver, it's refunded in full.",
  },
  {
    icon: "📦",
    num: "Step 04",
    title: "Delivered. You own it.",
    desc: "Full handover of source code, credentials and documentation. Everything is yours — host it anywhere, modify it freely. No lock-in. Post-delivery support included.",
  },
];

export default function HowWeWork() {
  return (
    <section id="how" style={{ padding: "96px 0" }}>
      <div style={{ maxWidth: 1060, margin: "0 auto", padding: "0 48px" }}>
        <span className="reveal" style={{ fontSize: 12, fontWeight: 600, color: "var(--accent)", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 14, display: "block" }}>
          How we work
        </span>
        <h2 className="reveal reveal-delay-1" style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 700, lineHeight: 1.12, letterSpacing: "-.025em", color: "var(--q-black)", marginBottom: 14 }}>
          Simple process. <span style={{ color: "var(--accent)" }}>Serious results.</span>
        </h2>
        <p className="reveal reveal-delay-2" style={{ maxWidth: 500, color: "var(--q-mid)", lineHeight: 1.7 }}>
          From your first message to a live product — here&apos;s what to expect when you work with Queloric.
        </p>

        <div
          className="reveal how-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 0,
            marginTop: 52,
            border: "1px solid var(--border)",
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
          {steps.map((step, i) => (
            <div
              key={step.num}
              style={{
                padding: "36px 28px",
                borderRight: i < steps.length - 1 ? "1px solid var(--border)" : "none",
                background: "var(--background)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div
                  style={{
                    width: 40, height: 40, borderRadius: 10,
                    background: "var(--q-accent-light)",
                    border: "1px solid var(--accent)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 18, flexShrink: 0,
                  }}
                >
                  {step.icon}
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--accent)", textTransform: "uppercase", letterSpacing: ".1em" }}>
                  {step.num}
                </span>
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--q-black)", marginBottom: 8 }}>{step.title}</h3>
              <p style={{ fontSize: 13, color: "var(--q-muted)", lineHeight: 1.65, margin: 0 }}>{step.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <a
            href="/quote"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "12px 28px", borderRadius: 8, fontSize: 15, fontWeight: 500,
              textDecoration: "none", background: "var(--accent)", color: "#fff",
              transition: "opacity .15s",
            }}
            className="how-cta-btn"
          >
            Start with a free quote →
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .how-grid { grid-template-columns: 1fr !important; }
          .how-grid > div { border-right: none !important; border-bottom: 1px solid var(--border); }
          .how-grid > div:last-child { border-bottom: none; }
        }
        .how-cta-btn:hover { opacity: .88; }
      `}</style>
    </section>
  );
}
