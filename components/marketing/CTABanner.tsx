const badges = [
  "✓ 60 second quote",
  "✓ Fixed pricing",
  "✓ Live in days",
  "✓ You own the code",
  "✓ Projects from 50€",
];

export default function CTABanner() {
  return (
    <div
      style={{
        background: "var(--q-black)",
        padding: "88px 48px",
        textAlign: "center",
      }}
    >
      <h2
        style={{
          fontSize: "clamp(28px,4vw,42px)", fontWeight: 700, lineHeight: 1.12,
          letterSpacing: "-.025em", color: "#fff", marginBottom: 14,
        }}
      >
        Your competitors already have a better website.{" "}
        <span style={{ color: "var(--accent)" }}>Let&apos;s fix that.</span>
      </h2>
      <p style={{ color: "rgba(255,255,255,.5)", marginBottom: 32, fontSize: 17, lineHeight: 1.7 }}>
        Tell us what you need and we&apos;ll send a fixed-price quote today.
      </p>
      <a
        href="/quote"
        style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "14px 36px", borderRadius: 8, fontSize: 16, fontWeight: 500,
          textDecoration: "none", background: "var(--accent)", color: "#fff",
          transition: "all .15s",
        }}
      >
        Get an instant quote →
      </a>
      <div style={{ display: "flex", gap: 28, justifyContent: "center", flexWrap: "wrap", marginTop: 22 }}>
        {badges.map((b) => (
          <span key={b} style={{ fontSize: 13, color: "rgba(255,255,255,.35)", display: "flex", alignItems: "center", gap: 6 }}>
            {b}
          </span>
        ))}
      </div>
    </div>
  );
}
