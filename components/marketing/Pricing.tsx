interface PricingCard {
  tier: string;
  range: string;
  desc: string;
  features: string[];
  popular?: boolean;
}

interface PricingBlock {
  title: string;
  sub: string;
  cards: PricingCard[];
}

const blocks: PricingBlock[] = [
  {
    title: "🌐 Website Design & Development",
    sub: "Price depends on number of pages, complexity and features required.",
    cards: [
      {
        tier: "Simple Website", range: "130€ – 370€", desc: "1–3 pages",
        features: ["Custom design", "Mobile responsive", "Contact form", "Basic SEO", "2–3 day delivery"],
      },
      {
        tier: "Business Website", range: "370€ – 850€", desc: "4–8 pages", popular: true,
        features: ["Full custom design", "Multiple pages", "On-page SEO", "Contact / booking form", "Full source code", "4–6 day delivery"],
      },
      {
        tier: "E-commerce / Complex", range: "850€ – 2,300+€", desc: "Shop, bookings, custom features",
        features: ["E-commerce or booking", "Payment integration", "User accounts", "Full CMS", "Advanced SEO"],
      },
    ],
  },
  {
    title: "🤖 AI Chatbot Development",
    sub: "Powered by Claude AI.",
    cards: [
      {
        tier: "Basic Chatbot", range: "70€ – 140€", desc: "Simple FAQ handling",
        features: ["Embedded widget", "Pre-set flow", "Any platform", "2–3 day delivery"],
      },
      {
        tier: "Custom Chatbot", range: "140€ – 320€", desc: "Trained on your business", popular: true,
        features: ["Trained on your content", "Multi-language", "Custom branded design", "Full source code", "Lead capture"],
      },
      {
        tier: "Advanced Chatbot", range: "320€ – 650+€", desc: "With integrations & database",
        features: ["CRM integration", "User authentication", "Booking / scheduling", "Analytics dashboard"],
      },
    ],
  },
  {
    title: "⚡ Bots & Automation",
    sub: "Telegram, Discord bots and workflow automation.",
    cards: [
      {
        tier: "Simple Bot", range: "45€ – 90€", desc: "Basic commands",
        features: ["Custom commands", "Auto responses", "1–2 day delivery"],
      },
      {
        tier: "AI-Powered Bot", range: "110€ – 280€", desc: "Intelligent responses", popular: true,
        features: ["Claude AI integration", "Custom personality", "Command system", "Full source code"],
      },
      {
        tier: "Workflow Automation", range: "75€ – 370+€", desc: "Automate repetitive tasks",
        features: ["Tool integrations", "Custom scripts", "Webhooks & APIs"],
      },
    ],
  },
  {
    title: "🔄 Other Services",
    sub: "Automation, management, SEO — all scoped per project.",
    cards: [
      {
        tier: "Workflow Automation", range: "75€ – 370+€", desc: "Automate repetitive tasks",
        features: ["Tool integrations", "Custom scripts", "Webhooks & APIs", "Full source code"],
      },
      {
        tier: "Website Management", range: "45€ – 140€/mo", desc: "Monthly maintenance", popular: true,
        features: ["Content updates", "Security monitoring", "Weekly backups", "Priority support"],
      },
      {
        tier: "SEO & Content", range: "75€ – 280+€", desc: "Rankings and visibility",
        features: ["On-page SEO audit", "Schema markup", "AI content writing", "Sitemap & robots.txt"],
      },
    ],
  },
];

function Card({ card }: { card: PricingCard }) {
  return (
    <div
      style={{
        border: `1px solid ${card.popular ? "var(--accent)" : "var(--border)"}`,
        borderRadius: 10,
        padding: "28px 24px",
        position: "relative",
        background: card.popular ? "var(--accent)" : "var(--background)",
      }}
    >
      {card.popular && (
        <div
          style={{
            position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
            background: "#16a34a", color: "#fff", fontSize: 11, fontWeight: 600,
            padding: "4px 12px", borderRadius: 20, letterSpacing: ".04em",
            textTransform: "uppercase", whiteSpace: "nowrap",
          }}
        >
          Most popular
        </div>
      )}
      <span style={{ fontSize: 11, fontWeight: 600, color: card.popular ? "rgba(255,255,255,.5)" : "var(--q-muted)", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 14, display: "block" }}>
        {card.tier}
      </span>
      <div style={{ fontSize: 28, fontWeight: 700, color: card.popular ? "#fff" : "var(--q-black)", lineHeight: 1, letterSpacing: "-.02em", marginBottom: 4 }}>
        {card.range}
      </div>
      <p style={{ fontSize: 13, color: card.popular ? "rgba(255,255,255,.4)" : "var(--q-muted)", marginBottom: 20 }}>{card.desc}</p>
      <hr style={{ border: "none", borderTop: `1px solid ${card.popular ? "rgba(255,255,255,.2)" : "var(--border)"}`, marginBottom: 18 }} />
      <ul style={{ listStyle: "none", marginBottom: 24, display: "flex", flexDirection: "column", gap: 8 }}>
        {card.features.map((f) => (
          <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: card.popular ? "rgba(255,255,255,.75)" : "var(--q-dark)", lineHeight: 1.5 }}>
            <span style={{ color: card.popular ? "#86efac" : "#16a34a", flexShrink: 0 }}>✓</span> {f}
          </li>
        ))}
      </ul>
      <a
        href="/quote"
        style={{
          display: "block", width: "100%", padding: "11px 20px", borderRadius: 8,
          textAlign: "center", fontSize: 14, fontWeight: 500, textDecoration: "none",
          cursor: "pointer", transition: "all .15s",
          background: card.popular ? "#fff" : "var(--background)",
          color: card.popular ? "var(--accent)" : "var(--q-black)",
          border: `1px solid ${card.popular ? "#fff" : "var(--border)"}`,
        }}
      >
        Get a quote
      </a>
    </div>
  );
}

export default function Pricing() {
  return (
    <section
      id="pricing"
      style={{ padding: "96px 0", background: "var(--surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
    >
      <div style={{ maxWidth: 1060, margin: "0 auto", padding: "0 48px" }}>
        <span className="reveal" style={{ fontSize: 12, fontWeight: 600, color: "var(--accent)", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 14, display: "block" }}>
          Pricing
        </span>
        <h2 className="reveal reveal-delay-1" style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 700, lineHeight: 1.12, letterSpacing: "-.025em", color: "var(--q-black)", marginBottom: 14 }}>
          Transparent ranges. <span style={{ color: "var(--accent)" }}>Every project quoted individually.</span>
        </h2>
        <p className="reveal reveal-delay-2" style={{ maxWidth: 560, color: "var(--q-mid)", lineHeight: 1.7, marginBottom: 56 }}>
          We don&apos;t do fixed packages — every project is different. Get a quote and we&apos;ll send an exact price within hours.
        </p>

        {blocks.map((block, bi) => (
          <div
            key={block.title}
            style={{
              marginBottom: bi < blocks.length - 1 ? 56 : 0,
              paddingBottom: bi < blocks.length - 1 ? 56 : 0,
              borderBottom: bi < blocks.length - 1 ? "1px solid var(--border)" : "none",
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 600, color: "var(--q-black)", marginBottom: 4 }}>{block.title}</div>
            <p style={{ fontSize: 14, color: "var(--q-muted)", marginBottom: 24 }}>{block.sub}</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }} className="pricing-cards-grid">
              {block.cards.map((card) => (
                <Card key={card.tier} card={card} />
              ))}
            </div>
          </div>
        ))}

        <p style={{ textAlign: "center", fontSize: 14, color: "var(--q-muted)", marginTop: 32 }}>
          Not sure what you need?{" "}
          <a href="/quote" style={{ color: "var(--accent)", fontWeight: 500, textDecoration: "none" }}>
            Answer a few quick questions
          </a>{" "}
          and we&apos;ll recommend the right approach.
        </p>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .pricing-cards-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
