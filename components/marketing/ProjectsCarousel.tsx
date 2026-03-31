"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const slides = [
  {
    type: "Website",
    title: "Restaurant & Booking Site",
    desc: "Custom website with online booking system and menu management for a local restaurant. Mobile-first, SEO optimised, live in 4 days. The client saw a 40% increase in online reservations within the first month.",
    tags: ["Custom HTML/CSS", "Booking System", "SEO", "Mobile First"],
    url: "restauraciapetit.sk",
    svg: (
      <svg viewBox="0 0 480 280" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", width: "100%" }}>
        <rect width="480" height="280" fill="#1c1008"/>
        <defs><linearGradient id="rg1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0d0600"/><stop offset="100%" stopColor="#2a1200"/></linearGradient></defs>
        <rect x="0" y="0" width="480" height="130" fill="url(#rg1)"/>
        <rect x="0" y="0" width="480" height="36" fill="rgba(0,0,0,0.5)"/>
        <text x="24" y="22" fontSize="12" fontWeight="700" fill="#f5e6c8" fontFamily="sans-serif">Reštaurácia Petit</text>
        <text x="240" y="22" fontSize="9" fill="rgba(245,230,200,0.4)" textAnchor="middle" fontFamily="sans-serif">Menu · Rezervácia · O nás · Kontakt</text>
        <rect x="388" y="12" width="68" height="18" rx="4" fill="#c8860a"/>
        <text x="422" y="24" fontSize="9" fill="#fff" textAnchor="middle" fontFamily="sans-serif">Rezervovať</text>
        <text x="240" y="68" fontSize="9" fill="rgba(245,230,200,0.5)" textAnchor="middle" letterSpacing="4" fontFamily="sans-serif">FINE DINING · BANSKÁ BYSTRICA</text>
        <text x="240" y="92" fontSize="22" fontWeight="700" fill="#f5e6c8" textAnchor="middle" fontFamily="sans-serif">Autentická Slovenská</text>
        <text x="240" y="114" fontSize="22" fontWeight="700" fill="#f5e6c8" textAnchor="middle" fontFamily="sans-serif">Kuchyňa</text>
        <line x1="200" y1="124" x2="280" y2="124" stroke="#c8860a" strokeWidth="1" opacity="0.6"/>
        {[["🍽️","Menu","Sezónne špeciality",20,88],["📅","Rezervácia","Online 24/7",172,240],["⭐","4.9 / 5","142 recenzií",324,392]].map(([icon,t,d,x,cx]) => (
          <g key={t as string}>
            <rect x={x as number} y="148" width="136" height="112" rx="6" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5"/>
            <text x={cx as number} y="178" fontSize="18" textAnchor="middle" fontFamily="sans-serif">{icon}</text>
            <text x={cx as number} y="200" fontSize="11" fontWeight="600" fill="#f5e6c8" textAnchor="middle" fontFamily="sans-serif">{t}</text>
            <text x={cx as number} y="216" fontSize="9" fill="rgba(245,230,200,0.4)" textAnchor="middle" fontFamily="sans-serif">{d}</text>
          </g>
        ))}
      </svg>
    ),
  },
  {
    type: "AI Chatbot",
    title: "E-commerce Support Bot",
    desc: "Claude AI chatbot embedded into an online store handling FAQs, order tracking and returns 24/7. Cut support tickets by 60% in the first two weeks. Customers get instant answers at any hour.",
    tags: ["Claude AI", "Shopify", "Multi-Language", "Lead Capture"],
    url: "shopelite.sk — AI Support",
    svg: (
      <svg viewBox="0 0 480 280" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", width: "100%" }}>
        <rect width="480" height="280" fill="#f8fafc"/>
        <rect x="0" y="0" width="480" height="44" fill="#fff" stroke="#e2e8f0" strokeWidth="0.5"/>
        <circle cx="24" cy="22" r="10" fill="#4f46e5"/>
        <text x="24" y="27" fontSize="9" fill="#fff" textAnchor="middle" fontWeight="700" fontFamily="sans-serif">Q</text>
        <text x="42" y="20" fontSize="11" fontWeight="700" fill="#111" fontFamily="sans-serif">Claude AI Support</text>
        <text x="42" y="33" fontSize="9" fill="#16a34a" fontFamily="sans-serif">● Online · Odpovie okamžite</text>
        <rect x="14" y="56" width="220" height="36" rx="4" fill="#eef2ff" stroke="#c7d2fe" strokeWidth="0.5"/>
        <text x="24" y="70" fontSize="9" fill="#4f46e5" fontFamily="sans-serif">Dobrý deň! Ako vám môžem pomôcť?</text>
        <text x="24" y="84" fontSize="9" fill="#6366f1" fontFamily="sans-serif">Mám otázku k objednávke alebo produktu? 👋</text>
        <rect x="246" y="102" width="200" height="24" rx="4" fill="#4f46e5"/>
        <text x="256" y="118" fontSize="9" fill="#fff" fontFamily="sans-serif">Kde je moja objednávka #5521?</text>
        <rect x="14" y="136" width="260" height="48" rx="4" fill="#eef2ff" stroke="#c7d2fe" strokeWidth="0.5"/>
        <text x="24" y="150" fontSize="9" fill="#4f46e5" fontFamily="sans-serif">Objednávka #5521 je na ceste! 📦</text>
        <text x="24" y="164" fontSize="9" fill="#4f46e5" fontFamily="sans-serif">Očakávaná dodávka: zajtra do 17:00 ✅</text>
        <text x="24" y="178" fontSize="9" fill="#6366f1" fontFamily="sans-serif">Chcete sledovať zásielku?</text>
        <rect x="14" y="196" width="80" height="20" rx="10" fill="#fff" stroke="#c7d2fe" strokeWidth="1"/>
        <text x="54" y="210" fontSize="8" fill="#4f46e5" textAnchor="middle" fontFamily="sans-serif">Sledovať</text>
        <rect x="102" y="196" width="100" height="20" rx="10" fill="#fff" stroke="#c7d2fe" strokeWidth="1"/>
        <text x="152" y="210" fontSize="8" fill="#4f46e5" textAnchor="middle" fontFamily="sans-serif">Kontaktovať podporu</text>
        <rect x="210" y="196" width="80" height="20" rx="10" fill="#fff" stroke="#c7d2fe" strokeWidth="1"/>
        <text x="250" y="210" fontSize="8" fill="#4f46e5" textAnchor="middle" fontFamily="sans-serif">Reklamácia</text>
        <rect x="0" y="248" width="480" height="32" fill="#fff" stroke="#e2e8f0" strokeWidth="0.5"/>
        <rect x="12" y="256" width="400" height="18" rx="9" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="0.5"/>
        <text x="24" y="268" fontSize="9" fill="#94a3b8" fontFamily="sans-serif">Napíšte správu...</text>
        <rect x="424" y="254" width="44" height="20" rx="10" fill="#4f46e5"/>
        <text x="446" y="268" fontSize="9" fill="#fff" textAnchor="middle" fontFamily="sans-serif">→</text>
      </svg>
    ),
  },
  {
    type: "Discord Bot",
    title: "Community Management Bot",
    desc: "AI-powered Discord bot for a gaming community with 2,000+ members. Handles moderation, custom commands, role management and Claude AI Q&A. Saved the admins hours of manual work every day.",
    tags: ["Discord", "Claude AI", "Moderation", "Auto Roles"],
    url: "Discord — GameZone Community",
    chromeDark: true,
    svg: (
      <svg viewBox="0 0 480 280" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", width: "100%" }}>
        <rect width="480" height="280" fill="#313338"/>
        <rect x="0" y="0" width="68" height="280" fill="#1e1f22"/>
        <circle cx="34" cy="20" r="14" fill="#5865f2"/>
        <text x="34" y="25" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700" fontFamily="sans-serif">GZ</text>
        <rect x="68" y="0" width="120" height="280" fill="#2b2d31"/>
        <text x="78" y="18" fontSize="8" fill="#96989d" letterSpacing="1" fontFamily="sans-serif">GAMEZONE</text>
        <rect x="68" y="24" width="120" height="22" fill="rgba(255,255,255,0.06)" rx="2"/>
        <text x="84" y="38" fontSize="10" fill="#fff" fontFamily="sans-serif"># general</text>
        <text x="84" y="56" fontSize="10" fill="#96989d" fontFamily="sans-serif"># announcements</text>
        <text x="84" y="72" fontSize="10" fill="#96989d" fontFamily="sans-serif"># off-topic</text>
        <text x="78" y="94" fontSize="8" fill="#96989d" letterSpacing="1" fontFamily="sans-serif">BOTY</text>
        <text x="84" y="110" fontSize="10" fill="#96989d" fontFamily="sans-serif">🤖 quelbot-cmds</text>
        <rect x="198" y="12" width="272" height="68" rx="4" fill="rgba(88,101,242,0.1)"/>
        <rect x="198" y="12" width="3" height="68" rx="2" fill="#5865f2"/>
        <text x="210" y="26" fontSize="8" fill="#5865f2" fontWeight="700" fontFamily="sans-serif">QuelBot BOT</text>
        <text x="210" y="40" fontSize="9" fill="#fff" fontWeight="700" fontFamily="sans-serif">Vitaj v GameZone! 🎮</text>
        <text x="210" y="54" fontSize="8" fill="#b5bac1" fontFamily="sans-serif">Členov: 2,847 · Zareaguj pre rolu</text>
        <circle cx="210" cy="110" r="12" fill="#ed4245"/>
        <text x="210" y="115" fontSize="8" fill="#fff" textAnchor="middle" fontWeight="700" fontFamily="sans-serif">M</text>
        <text x="228" y="118" fontSize="9" fill="#dcddde" fontFamily="sans-serif">!rank — kto vedie tento týždeň?</text>
        <circle cx="210" cy="148" r="12" fill="#5865f2"/>
        <text x="210" y="153" fontSize="8" fill="#fff" textAnchor="middle" fontWeight="700" fontFamily="sans-serif">Q</text>
        <text x="228" y="156" fontSize="9" fill="#dcddde" fontFamily="sans-serif">🏆 Top: xXProX (4,210) · Marek (3,891)</text>
        <rect x="188" y="258" width="282" height="22" rx="4" fill="#383a40"/>
        <text x="200" y="272" fontSize="8" fill="#72767d" fontFamily="sans-serif">Správa #general</text>
      </svg>
    ),
  },
  {
    type: "Automation",
    title: "Lead Generation Pipeline",
    desc: "Automated workflow connecting contact form → CRM → email → Slack notifications. Zero manual data entry, saving 3+ hours per week. Every lead instantly tracked and followed up on.",
    tags: ["n8n", "CRM Integration", "Slack", "Email"],
    url: "n8n workflow — Lead Pipeline",
    svg: (
      <svg viewBox="0 0 480 280" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", width: "100%" }}>
        <defs>
          <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M2 1L8 5L2 9" fill="none" stroke="#4f46e5" strokeWidth="1.5" strokeLinecap="round"/></marker>
          <marker id="arr2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M2 1L8 5L2 9" fill="none" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round"/></marker>
          <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="0.8" fill="rgba(255,255,255,0.05)"/></pattern>
        </defs>
        <rect width="480" height="280" fill="#1a1a2e"/>
        <rect width="480" height="280" fill="url(#dots)"/>
        <rect x="20" y="110" width="100" height="56" rx="8" fill="#1e1b4b" stroke="#4f46e5" strokeWidth="1.5"/>
        <rect x="20" y="110" width="100" height="18" rx="8" fill="#4f46e5"/>
        <rect x="20" y="120" width="100" height="8" fill="#4f46e5"/>
        <text x="70" y="123" fontSize="8" fill="#fff" textAnchor="middle" fontWeight="600" fontFamily="sans-serif">Webhook</text>
        <text x="70" y="138" fontSize="9" fill="#a5b4fc" textAnchor="middle" fontFamily="sans-serif">📋 Contact Form</text>
        <line x1="120" y1="138" x2="160" y2="138" stroke="#4f46e5" strokeWidth="1.5" markerEnd="url(#arr)"/>
        <rect x="160" y="110" width="100" height="56" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1"/>
        <text x="210" y="130" fontSize="8" fill="#818cf8" textAnchor="middle" fontWeight="600" fontFamily="sans-serif">🔀 Split</text>
        <text x="210" y="146" fontSize="8" fill="rgba(165,180,252,0.7)" textAnchor="middle" fontFamily="sans-serif">Route by service</text>
        <line x1="260" y1="125" x2="310" y2="82" stroke="#4f46e5" strokeWidth="1.2" markerEnd="url(#arr)"/>
        <line x1="260" y1="138" x2="310" y2="138" stroke="#4f46e5" strokeWidth="1.2" markerEnd="url(#arr)"/>
        <line x1="260" y1="151" x2="310" y2="194" stroke="#4f46e5" strokeWidth="1.2" markerEnd="url(#arr)"/>
        <rect x="310" y="56" width="90" height="48" rx="8" fill="#052e16" stroke="#16a34a" strokeWidth="1"/>
        <text x="355" y="76" fontSize="8" fill="#4ade80" textAnchor="middle" fontWeight="600" fontFamily="sans-serif">📊 CRM</text>
        <rect x="310" y="112" width="90" height="48" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1"/>
        <text x="355" y="132" fontSize="8" fill="#a5b4fc" textAnchor="middle" fontWeight="600" fontFamily="sans-serif">📧 Email</text>
        <rect x="310" y="168" width="90" height="48" rx="8" fill="#1a0d2e" stroke="#a855f7" strokeWidth="1"/>
        <text x="355" y="188" fontSize="8" fill="#d8b4fe" textAnchor="middle" fontWeight="600" fontFamily="sans-serif">💬 Slack</text>
        <line x1="400" y1="80" x2="430" y2="138" stroke="#16a34a" strokeWidth="1.2" markerEnd="url(#arr2)"/>
        <line x1="400" y1="136" x2="430" y2="138" stroke="#16a34a" strokeWidth="1.2" markerEnd="url(#arr2)"/>
        <line x1="400" y1="192" x2="430" y2="138" stroke="#16a34a" strokeWidth="1.2" markerEnd="url(#arr2)"/>
        <rect x="430" y="112" width="38" height="48" rx="8" fill="#052e16" stroke="#16a34a" strokeWidth="1.5"/>
        <text x="449" y="140" fontSize="12" fill="#4ade80" textAnchor="middle" fontFamily="sans-serif">✓</text>
      </svg>
    ),
  },
  {
    type: "Website",
    title: "Freelancer Portfolio",
    desc: "Clean minimal portfolio for a graphic designer. Custom animations, project gallery, contact form and blog. Delivered in 3 days. The client landed two new clients within a week of launch.",
    tags: ["Custom Design", "Animations", "Blog", "Gallery"],
    url: "martinkovac.eu",
    svg: (
      <svg viewBox="0 0 480 280" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", width: "100%" }}>
        <rect width="480" height="280" fill="#0a0a0a"/>
        <line x1="0" y1="40" x2="480" y2="40" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5"/>
        <text x="24" y="25" fontSize="12" fontWeight="700" fill="#fff" fontFamily="sans-serif">MK.</text>
        <text x="280" y="25" fontSize="9" fill="rgba(255,255,255,0.3)" textAnchor="middle" fontFamily="sans-serif">Práce · O mne · Kontakt</text>
        <text x="24" y="68" fontSize="9" fill="rgba(255,255,255,0.2)" letterSpacing="3" fontFamily="sans-serif">GRAFICKÝ DIZAJNÉR</text>
        <text x="24" y="90" fontSize="22" fontWeight="700" fill="#fff" fontFamily="sans-serif">Martin Kováč</text>
        <text x="24" y="110" fontSize="11" fill="rgba(255,255,255,0.35)" fontFamily="sans-serif">Branding · UI/UX · Motion Design</text>
        <rect x="16" y="128" width="140" height="100" rx="6" fill="#141414" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5"/>
        <rect x="16" y="128" width="140" height="66" rx="6" fill="#1a0a2e"/>
        <text x="30" y="158" fontSize="18" fill="#a855f7" fontFamily="sans-serif">◈</text>
        <text x="24" y="204" fontSize="9" fontWeight="600" fill="#fff" fontFamily="sans-serif">Brand Identity</text>
        <rect x="170" y="128" width="140" height="100" rx="6" fill="#141414" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5"/>
        <rect x="170" y="128" width="140" height="66" rx="6" fill="#0a1a2e"/>
        <rect x="190" y="146" width="60" height="6" rx="2" fill="rgba(99,102,241,0.4)"/>
        <rect x="190" y="156" width="40" height="5" rx="2" fill="rgba(255,255,255,0.1)"/>
        <text x="178" y="204" fontSize="9" fontWeight="600" fill="#fff" fontFamily="sans-serif">Web Design</text>
        <rect x="324" y="128" width="140" height="100" rx="6" fill="#141414" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5"/>
        <rect x="324" y="128" width="140" height="66" rx="6" fill="#1a1400"/>
        <text x="370" y="168" fontSize="28" fill="rgba(234,179,8,0.5)" textAnchor="middle" fontFamily="sans-serif">▷</text>
        <text x="332" y="204" fontSize="9" fontWeight="600" fill="#fff" fontFamily="sans-serif">Motion Reel</text>
      </svg>
    ),
  },
];

export default function ProjectsCarousel() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((index: number) => {
    setCurrent(((index % slides.length) + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => goTo(current + 1), 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [current, goTo]);

  // Need useRef for timer reset on manual nav
  const resetTimer = useCallback((index: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    goTo(index);
  }, [goTo]);

  const slide = slides[current];

  return (
    <section
      id="projects"
      style={{ padding: "96px 0", background: "var(--surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
    >
      <div style={{ maxWidth: 1060, margin: "0 auto", padding: "0 48px" }}>
        <span className="reveal" style={{ fontSize: 12, fontWeight: 600, color: "var(--accent)", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 14, display: "block" }}>
          Recent work
        </span>
        <h2 className="reveal reveal-delay-1" style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 700, lineHeight: 1.12, letterSpacing: "-.025em", color: "var(--q-black)", marginBottom: 14 }}>
          Projects we&apos;ve delivered.
        </h2>
        <p className="reveal reveal-delay-2" style={{ maxWidth: 500, color: "var(--q-mid)", lineHeight: 1.7 }}>
          A selection of recent client projects. Every one delivered on time, on budget, with full source code handed over.
        </p>

        <div className="reveal" style={{ marginTop: 52, position: "relative" }}>
          {/* Slide */}
          <div style={{ overflow: "hidden", borderRadius: 12, border: "1px solid var(--border)" }}>
            <div
              style={{
                padding: "48px 52px",
                background: "var(--background)",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 64,
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: "var(--q-muted)", textTransform: "uppercase", letterSpacing: ".1em", background: "var(--surface)", border: "1px solid var(--border)", padding: "4px 10px", borderRadius: 4 }}>
                    {slide.type}
                  </span>
                  <span style={{ fontSize: 11, color: "#16a34a", fontWeight: 500 }}>✓ Delivered</span>
                </div>
                <div style={{ fontSize: 28, fontWeight: 700, color: "var(--q-black)", letterSpacing: "-.02em", marginBottom: 14, lineHeight: 1.2 }}>
                  {slide.title}
                </div>
                <p style={{ fontSize: 15, color: "var(--q-muted)", lineHeight: 1.7, marginBottom: 24 }}>{slide.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {slide.tags.map((tag) => (
                    <span key={tag} style={{ fontSize: 11, padding: "3px 9px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 4, color: "var(--q-muted)" }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div style={{ borderRadius: 8, overflow: "hidden", border: "1px solid var(--border)", boxShadow: "0 4px 24px rgba(0,0,0,.08)" }}>
                <div style={{ background: slide.chromeDark ? "#2b2d31" : "var(--surface)", padding: "8px 12px", display: "flex", alignItems: "center", gap: 6, borderBottom: `1px solid ${slide.chromeDark ? "#1e1f22" : "var(--border)"}` }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ff5f57" }} />
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#febc2e" }} />
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#28c840" }} />
                  <div style={{ flex: 1, background: slide.chromeDark ? "#1e1f22" : "var(--background)", border: `1px solid ${slide.chromeDark ? "#111" : "var(--border)"}`, borderRadius: 4, padding: "2px 10px", fontSize: 10, color: slide.chromeDark ? "#6d6f78" : "var(--q-muted)", marginLeft: 6 }}>
                    {slide.url}
                  </div>
                </div>
                {slide.svg}
              </div>
            </div>
          </div>

          {/* Nav */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 24 }}>
            <button
              onClick={() => resetTimer(current - 1)}
              style={{ width: 40, height: 40, borderRadius: "50%", border: "1px solid var(--border)", background: "var(--background)", color: "var(--q-mid)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, transition: "all .15s" }}
            >←</button>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => resetTimer(i)}
                  style={{
                    width: i === current ? 24 : 8,
                    height: 8, borderRadius: i === current ? 4 : "50%",
                    background: i === current ? "var(--accent)" : "var(--border)",
                    border: "none", padding: 0, cursor: "pointer", transition: "all .2s",
                  }}
                />
              ))}
            </div>
            <button
              onClick={() => resetTimer(current + 1)}
              style={{ width: 40, height: 40, borderRadius: "50%", border: "1px solid var(--border)", background: "var(--background)", color: "var(--q-mid)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, transition: "all .15s" }}
            >→</button>
          </div>

          {/* CTA */}
          <div style={{ background: "var(--accent)", borderRadius: 12, padding: "32px 40px", marginTop: 2, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
            <div>
              <h3 style={{ color: "#fff", fontSize: 20, marginBottom: 6, fontWeight: 600 }}>Your project could be next.</h3>
              <p style={{ color: "rgba(255,255,255,.6)", fontSize: 14, margin: 0 }}>We&apos;re taking on new projects now. Get a fixed-price quote in 60 seconds.</p>
            </div>
            <a href="/quote" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 26px", borderRadius: 8, fontSize: 15, fontWeight: 500, textDecoration: "none", background: "rgba(255,255,255,.1)", color: "#fff", border: "1px solid rgba(255,255,255,.3)", whiteSpace: "nowrap" }}>
              Get a quote →
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .carousel-slide-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </section>
  );
}
