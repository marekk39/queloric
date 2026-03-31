const serviceRows = [
  {
    icon: "🤖",
    title: "AI Chatbot Development",
    desc: "Powered by Claude AI. A chatbot that genuinely understands your customers — not a rigid script. Handles FAQs, bookings, support queries and lead capture 24/7, without any staff needed.",
  },
  {
    icon: "⚡",
    title: "Telegram & Discord Bots",
    desc: "Custom bots for your community or business. Automated responses, moderation, notifications and commands — built exactly to your spec with optional Claude AI integration.",
  },
  {
    icon: "🔄",
    title: "Workflow Automation",
    desc: "Stop doing repetitive tasks manually. We connect your tools, automate your processes and save you hours every single week — from simple scripts to complex multi-step pipelines.",
  },
  {
    icon: "🛡️",
    title: "Website Management",
    desc: "Monthly maintenance handled completely. Updates, backups, security monitoring and performance checks — so your site stays fast, safe and up to date without you lifting a finger.",
  },
  {
    icon: "📈",
    title: "SEO & AI Content",
    desc: "On-page SEO optimisation and AI-assisted content creation. Get found on Google with proper technical foundations and content that actually ranks — without paying agency prices.",
  },
  {
    icon: "🔗",
    title: "API & Backend Development",
    desc: "Custom REST APIs, database integrations and backend logic. Need your app to talk to another service or a custom data pipeline built? We handle the full stack end to end.",
  },
  {
    icon: "🎨",
    title: "Landing Page Design",
    desc: "High-converting single-page designs for product launches, campaigns and lead generation. Fast to build, mobile-first, and optimised to turn visitors into enquiries.",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      style={{
        padding: "96px 0",
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 48px" }}>
        <span className="reveal" style={{ fontSize: 12, fontWeight: 600, color: "var(--accent)", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 14, display: "block" }}>
          What we build
        </span>
        <h2 className="reveal reveal-delay-1" style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 700, lineHeight: 1.12, letterSpacing: "-.025em", color: "var(--q-black)", marginBottom: 14 }}>
          One team. Every digital service your{" "}
          <span style={{ color: "var(--accent)" }}>business actually needs.</span>
        </h2>
        <p className="reveal reveal-delay-2" style={{ maxWidth: 520, color: "var(--q-mid)", lineHeight: 1.7 }}>
          Instead of hiring three different specialists at agency rates, you get one team that handles websites, AI chatbots, bots and automation.
        </p>

        <div
          className="reveal"
          style={{
            display: "flex", flexDirection: "column",
            marginTop: 52, border: "1px solid var(--border)",
            borderRadius: 12, overflow: "hidden",
          }}
        >
          {/* Featured: Website Design */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 52,
              alignItems: "center",
              padding: 48,
              background: "var(--q-black)",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <div>
              <span style={{ fontSize: 32, display: "block", marginBottom: 12 }}>🌐</span>
              <h3 style={{ fontSize: 22, color: "#fff", marginBottom: 12, fontWeight: 600 }}>Website Design &amp; Development</h3>
              <p style={{ marginBottom: 20, color: "rgba(255,255,255,.5)", fontSize: 15, lineHeight: 1.7 }}>
                Custom websites built from scratch — no templates, no page builders. Clean code, fast loading, mobile-first and SEO-ready from day one.
              </p>
            </div>
            {/* Browser mockup */}
            <div style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 8, overflow: "hidden" }}>
              <div style={{ background: "rgba(255,255,255,.07)", padding: "10px 14px", display: "flex", gap: 6, alignItems: "center" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(255,100,100,.5)" }} />
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(255,200,100,.5)" }} />
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(100,200,100,.5)" }} />
                <div style={{ marginLeft: 8, flex: 1, background: "rgba(255,255,255,.06)", borderRadius: 4, padding: "3px 12px", fontSize: 11, color: "rgba(255,255,255,.2)" }}>yourclient.com</div>
              </div>
              <div style={{ padding: 20 }}>
                <div style={{ background: "rgba(255,255,255,.07)", borderRadius: 3, height: 10, width: "52%", marginBottom: 8 }} />
                <div style={{ background: "rgba(255,255,255,.07)", borderRadius: 3, height: 6, width: "88%", marginBottom: 8, marginTop: 12 }} />
                <div style={{ background: "rgba(255,255,255,.07)", borderRadius: 3, height: 6, width: "74%", marginBottom: 8 }} />
                <div style={{ background: "rgba(255,255,255,.07)", borderRadius: 3, height: 6, width: "81%", marginBottom: 8 }} />
                <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
                  <div style={{ background: "rgba(79,70,229,.4)", borderRadius: 6, height: 28, width: 80 }} />
                  <div style={{ background: "rgba(255,255,255,.07)", borderRadius: 6, height: 28, width: 62, opacity: .3 }} />
                </div>
                <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                  <div style={{ background: "rgba(255,255,255,.07)", borderRadius: 6, height: 48 }} />
                  <div style={{ background: "rgba(255,255,255,.07)", borderRadius: 6, height: 48, opacity: .6 }} />
                  <div style={{ background: "rgba(255,255,255,.07)", borderRadius: 6, height: 48, opacity: .4 }} />
                </div>
              </div>
            </div>
          </div>

          {/* Service rows */}
          {serviceRows.map((row) => (
            <div
              key={row.title}
              style={{
                display: "grid",
                gridTemplateColumns: "280px 1fr",
                alignItems: "center",
                background: "var(--background)",
                borderBottom: "1px solid var(--border)",
                transition: "background .2s",
              }}
              className="service-row-item"
            >
              <div style={{ padding: "28px 36px", display: "flex", alignItems: "center", gap: 16, borderRight: "1px solid var(--border)", height: "100%" }}>
                <span style={{ fontSize: 22, flexShrink: 0 }}>{row.icon}</span>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--q-black)", margin: 0 }}>{row.title}</h3>
              </div>
              <div style={{ padding: "28px 36px" }}>
                <p style={{ fontSize: 14, color: "var(--q-muted)", lineHeight: 1.65, margin: 0 }}>{row.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

        {/* CTA banner */}
        <a
          href="/quote"
          style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: 10, marginTop: 24, padding: "24px 40px", borderRadius: 10,
            background: "var(--accent)", color: "#fff", textDecoration: "none",
            fontSize: 16, fontWeight: 700, transition: "opacity .15s",
            letterSpacing: "-.01em",
          }}
          className="services-cta-banner"
        >
          Need a custom service? Get a quote in 60 seconds →
        </a>

      <style>{`
        .service-row-item:hover { background: var(--q-accent-light) !important; }
        .service-row-item:last-child { border-bottom: none !important; }
        .services-cta-banner:hover { opacity: .88; }
        @media (max-width: 768px) {
          .service-row-item { grid-template-columns: 1fr !important; }
          .service-row-item > div:first-child { border-right: none !important; border-bottom: 1px solid var(--border); }
        }
      `}</style>
    </section>
  );
}
