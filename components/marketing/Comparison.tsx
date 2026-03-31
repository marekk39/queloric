const ours = [
  "Price agreed before work starts",
  "Delivered in days, not months",
  "You own the full source code",
  "Claude AI — best model available",
  "Works on any platform",
  "Direct line to the developer",
  "Revisions included on every project",
];

const theirs = [
  "Unpredictable scope creep",
  "6–12 weeks to deliver",
  "You don't own the code",
  "Generic chatbot tools",
  "Extra fees per platform",
  "Account managers and ticket queues",
  "Changes billed at 100–200€/hr",
];

export default function Comparison() {
  return (
    <section style={{ padding: "96px 0" }}>
      <div className="reveal" style={{ maxWidth: 1060, margin: "0 auto", padding: "0 48px" }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: "var(--accent)", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 14, display: "block" }}>
          Why Queloric
        </span>
        <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 700, lineHeight: 1.12, letterSpacing: "-.025em", color: "var(--q-black)", marginBottom: 14 }}>
          Most businesses are{" "}
          <span
            style={{ position: "relative", display: "inline", color: "var(--q-black)" }}
            className="painted"
          >
            massively overpaying
          </span>{" "}
          for web development.
        </h2>
        <p style={{ maxWidth: 500, color: "var(--q-mid)", lineHeight: 1.7 }}>
          Agencies charge between 3,000€ and 15,000€+ for work done in days for a fraction of that. We cut the overhead, keep the quality.
        </p>

        {/* Comparison grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            border: "1px solid var(--border)",
            borderRadius: 12,
            overflow: "hidden",
            marginTop: 52,
            position: "relative",
          }}
        >
          {/* Ours */}
          <div
            style={{
              padding: "40px 36px",
              borderTop: "3px solid #16a34a",
              background: "var(--background)",
              borderRight: "1px solid var(--border)",
            }}
          >
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-.03em", lineHeight: 1, marginBottom: 4, color: "#15803d" }}>
              50€ – 2,500+€
            </div>
            <span style={{ fontSize: 13, color: "var(--q-muted)", marginBottom: 28, display: "block" }}>
              Scoped to your project. Fixed price. No surprises.
            </span>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 11 }}>
              {ours.map((item) => (
                <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: "var(--q-dark)", lineHeight: 1.5 }}>
                  <span style={{ color: "#16a34a", fontWeight: 600 }}>✓</span> {item}
                </li>
              ))}
            </ul>
          </div>

          {/* VS badge */}
          <div
            style={{
              position: "absolute",
              top: "50%", left: "50%",
              transform: "translate(-50%,-50%)",
              width: 36, height: 36,
              borderRadius: "50%",
              background: "var(--accent)",
              color: "#fff",
              fontSize: 11, fontWeight: 700,
              display: "flex", alignItems: "center", justifyContent: "center",
              zIndex: 2,
              boxShadow: "0 0 0 3px var(--background)",
            }}
          >
            VS
          </div>

          {/* Theirs */}
          <div
            style={{
              padding: "40px 36px",
              borderTop: "3px solid #ef4444",
              background: "var(--background)",
            }}
          >
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-.03em", lineHeight: 1, marginBottom: 4, color: "#dc2626", textDecoration: "line-through" }}>
              3,000 to 15,000€
            </div>
            <span style={{ fontSize: 13, color: "var(--q-muted)", marginBottom: 28, display: "block" }}>
              Typical traditional agency cost.
            </span>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 11 }}>
              {theirs.map((item) => (
                <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: "var(--q-muted)", lineHeight: 1.5 }}>
                  <span style={{ color: "#ef4444", fontWeight: 600 }}>✕</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: 36 }}>
          <a
            href="/quote"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "12px 28px", borderRadius: 8, fontSize: 15, fontWeight: 500,
              textDecoration: "none", background: "var(--accent)", color: "#fff",
              transition: "opacity .15s",
            }}
            className="comp-cta-btn"
          >
            Get Queloric pricing →
          </a>
        </div>

      <style>{`
        .painted::before {
          content: '';
          position: absolute;
          bottom: -2px; left: -4px; right: -4px;
          height: 36%;
          background: rgba(79,70,229,.15);
          transform: rotate(-1deg) skewX(-3deg);
          border-radius: 2px;
          z-index: -1;
        }
        .comp-cta-btn:hover { opacity: .88; }
        @media (max-width: 768px) {
          .comparison-grid-inner { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
