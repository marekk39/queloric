const items = [
  { icon: "⚡", strong: "Projects from 50€", rest: "— no agency overhead" },
  { icon: "🚀", strong: "Live in days", rest: "not months" },
  { icon: "🤖", strong: "Claude AI", rest: "— best model available" },
  { icon: "📦", strong: "Full source code", rest: "always included" },
  { icon: "💬", strong: "Reply within hours", rest: "guaranteed" },
  { icon: "💳", strong: "Secure Stripe payments", rest: "accepted" },
];

export default function TrustBar() {
  return (
    <div
      style={{
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        background: "var(--surface)",
        padding: "18px 48px",
      }}
    >
      <div
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          display: "flex",
          justifyContent: "center",
          gap: 40,
          flexWrap: "wrap",
        }}
      >
        {items.map((item) => (
          <div
            key={item.strong}
            style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "var(--q-mid)" }}
          >
            {item.icon}{" "}
            <strong style={{ color: "var(--q-black)" }}>{item.strong}</strong>
            &nbsp;{item.rest}
          </div>
        ))}
      </div>
    </div>
  );
}
