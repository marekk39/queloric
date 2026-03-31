const testimonials = [
  { initials: "JM", color: "var(--accent)", name: "James Mitchell", handle: "@jamesmitchell · London, UK", text: "\"Queloric built our restaurant website in 3 days. The booking system works perfectly and we've seen a 40% increase in online reservations. Absolutely worth every cent.\"" },
  { initials: "SR", color: "#16a34a", name: "Sofia Reinhardt", handle: "@sofiareinhardt · Berlin, DE", text: "\"The AI chatbot handles 80% of our customer questions automatically. Our support team finally has time for complex cases. Game changer for our e-shop.\"" },
  { initials: "AK", color: "#f59e0b", name: "Alexei Kovrov", handle: "@alexeikovrov · Amsterdam, NL", text: "\"Fast, professional, and they actually deliver what they promise. Our Discord bot is running flawlessly for 2,400 members. Highly recommended.\"" },
  { initials: "ML", color: "#8b5cf6", name: "Marie Leclerc", handle: "@marieleclerc · Paris, FR", text: "\"I was skeptical about the price — it seemed too affordable for this quality. But the portfolio site they delivered is stunning. Already got two new clients from it.\"" },
  { initials: "TC", color: "#ef4444", name: "Thomas Christiansen", handle: "@thomasc · Copenhagen, DK", text: "\"The workflow automation saves us 4 hours every single week. Every lead goes straight to our CRM and Slack. No more manual copy-pasting ever again.\"" },
  { initials: "NP", color: "#0891b2", name: "Nina Petrov", handle: "@ninapetrov · Vienna, AT", text: "\"We needed a chatbot trained on our legal documentation. Queloric delivered exactly that — it handles intake questions 24/7 and routes every case perfectly.\"" },
  { initials: "LW", color: "#dc2626", name: "Luca Weidmann", handle: "@lucaweidmann · Zurich, CH", text: "\"Three days from brief to live website. Clean code, mobile perfect, SEO ready. I showed it to my developer friend and he was genuinely impressed.\"" },
  { initials: "EO", color: "#7c3aed", name: "Elena Okonkwo", handle: "@elenaokonkwo · Stockholm, SE", text: "\"Communication was excellent throughout. They pushed back with better ideas when needed. The final product exceeded what I initially imagined.\"" },
];

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <div
      style={{
        background: "var(--background)",
        border: "1px solid var(--border)",
        borderRadius: 16,
        padding: 24,
        width: 320,
        flexShrink: 0,
        transition: "border-color .2s, box-shadow .2s",
      }}
      className="testimonial-card-item"
    >
      <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
        <div style={{ width: 44, height: 44, borderRadius: "50%", background: t.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, color: "#fff", flexShrink: 0, marginRight: 12 }}>
          {t.initials}
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: "var(--q-black)", marginBottom: 2 }}>{t.name}</div>
          <div style={{ fontSize: 12, color: "var(--q-muted)" }}>{t.handle}</div>
        </div>
      </div>
      <div style={{ color: "#f59e0b", fontSize: 12, marginBottom: 10, letterSpacing: 1 }}>★★★★★</div>
      <p style={{ fontSize: 14, color: "var(--q-mid)", lineHeight: 1.65, margin: 0 }}>{t.text}</p>
    </div>
  );
}

export default function Testimonials() {
  // Duplicate for seamless loop
  const all = [...testimonials, ...testimonials];

  return (
    <section
      style={{
        padding: "88px 0",
        overflow: "hidden",
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: 1060, margin: "0 auto", padding: "0 48px", marginBottom: 48 }}>
        <span className="reveal" style={{ fontSize: 12, fontWeight: 600, color: "var(--accent)", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 14, display: "block" }}>
          What clients say
        </span>
        <h2 className="reveal reveal-delay-1" style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 700, lineHeight: 1.12, letterSpacing: "-.025em", color: "var(--q-black)", marginBottom: 14 }}>
          Trusted by businesses <span style={{ color: "var(--accent)" }}>across Europe.</span>
        </h2>
        <p className="reveal reveal-delay-2" style={{ maxWidth: 500, color: "var(--q-mid)", lineHeight: 1.7 }}>
          Real feedback from real clients. Every project delivered on time, on budget, with full source code handed over.
        </p>
      </div>

      <div className="testimonials-track-wrap">
        <div className="testimonials-track">
          {all.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>

      <style>{`
        .testimonial-card-item:hover {
          border-color: var(--accent) !important;
          box-shadow: 0 4px 20px rgba(99,102,241,.1);
        }
        @media (max-width: 768px) {
          .testimonials-track-wrap::before,
          .testimonials-track-wrap::after { width: 60px !important; }
        }
      `}</style>
    </section>
  );
}
