"use client";

import { useRef, useState, useCallback } from "react";

export default function BeforeAfter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(50);
  const dragging = useRef(false);

  const setSlider = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const p = Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100));
    setPct(p);
  }, []);

  return (
    <section style={{ padding: "96px 0" }}>
      <div className="reveal" style={{ maxWidth: 1060, margin: "0 auto", padding: "0 48px" }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: "var(--accent)", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 14, display: "block" }}>
          The difference
        </span>
        <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 700, lineHeight: 1.12, letterSpacing: "-.025em", color: "var(--q-black)", marginBottom: 14 }}>
          Before Queloric. <span style={{ color: "var(--accent)" }}>After Queloric.</span>
        </h2>
        <p style={{ maxWidth: 500, color: "var(--q-mid)", lineHeight: 1.7 }}>
          Drag the slider to see the difference between a generic template website and a custom Queloric-built site.
        </p>

        <div style={{ marginTop: 52 }}>
          <div
            ref={containerRef}
            style={{ position: "relative", borderRadius: 12, overflow: "hidden", border: "1px solid var(--border)", cursor: "col-resize", userSelect: "none", height: 380 }}
            onMouseDown={(e) => { dragging.current = true; setSlider(e.clientX); }}
            onMouseMove={(e) => { if (dragging.current) setSlider(e.clientX); }}
            onMouseUp={() => { dragging.current = false; }}
            onMouseLeave={() => { dragging.current = false; }}
            onTouchStart={(e) => { dragging.current = true; setSlider(e.touches[0].clientX); }}
            onTouchMove={(e) => { if (dragging.current) setSlider(e.touches[0].clientX); }}
            onTouchEnd={() => { dragging.current = false; }}
          >
            {/* Before */}
            <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#e8e8e8" }}>
              <div style={{ textAlign: "center", padding: 24 }}>
                <div style={{ background: "#fff", border: "2px solid #ccc", borderRadius: 4, width: 300, overflow: "hidden", boxShadow: "2px 2px 8px rgba(0,0,0,.2)" }}>
                  <div style={{ background: "#ccc", padding: "6px 10px", display: "flex", gap: 5, alignItems: "center" }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ff5f57" }} />
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#febc2e" }} />
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#28c840" }} />
                    <div style={{ flex: 1, background: "#fff", borderRadius: 2, padding: "2px 8px", fontSize: 9, color: "#999" }}>http://www.mybusiness.weebly.com</div>
                  </div>
                  <div style={{ background: "#1a56c4", padding: "8px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 11, fontWeight: 900, color: "#fff", fontFamily: "serif", letterSpacing: 2 }}>MY BIZNESS™</span>
                    <div style={{ display: "flex", gap: 6 }}>
                      {["HOME","ABOUT","CONTACT"].map(l => <span key={l} style={{ fontSize: 8, color: "rgba(255,255,255,.7)", textDecoration: "underline" }}>{l}</span>)}
                    </div>
                  </div>
                  <div style={{ background: "#ffff00", border: "1px solid #cc0", padding: "3px 8px", fontSize: 8, color: "#000", textAlign: "center", fontWeight: "bold" }}>
                    🌟 WELCOME TO OUR WEBSITE!! BEST PRICES GUARANTEED!! 🌟
                  </div>
                  <div style={{ background: "linear-gradient(180deg,#1a56c4,#0a2d6e)", padding: "16px 12px", textAlign: "center" }}>
                    <div style={{ fontSize: 13, fontWeight: 900, color: "#ffff00", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4, fontFamily: "serif", textShadow: "1px 1px 0 #000" }}>WELCOME TO MY BIZNESS™</div>
                    <div style={{ fontSize: 8, color: "rgba(255,255,255,.6)", marginBottom: 8 }}>We are the #1 provider since 1998!!</div>
                    <div style={{ background: "#ff6600", border: "2px solid #cc4400", borderRadius: 2, padding: "4px 10px", fontSize: 9, color: "#fff", fontWeight: 900, display: "inline-block", textTransform: "uppercase" }}>CLICK HERE!!!</div>
                  </div>
                  <div style={{ padding: "10px 12px", background: "#f5f5f5" }}>
                    <div style={{ background: "#ff0000", color: "#fff", fontSize: 7, padding: "2px 6px", textAlign: "center", fontWeight: "bold", marginBottom: 6 }}>👁 VISITOR COUNT: 000847</div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 6 }}>
                      {[["SERVICES","We offer many great services"],["ABOUT US","We are a business company"],["CONTACT","Call us on our phone"]].map(([t,d]) => (
                        <div key={t} style={{ background: "#ddd", border: "1px solid #bbb", borderRadius: 2, padding: "6px 4px", textAlign: "center" }}>
                          <div style={{ fontSize: 8, fontWeight: "bold", color: "#333", marginBottom: 3 }}>{t}</div>
                          <div style={{ fontSize: 7, color: "#666", lineHeight: 1.3 }}>{d}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ background: "#333", padding: 6, textAlign: "center", fontSize: 7, color: "#999" }}>© 2009 MY BIZNESS™ · Best viewed in Internet Explorer</div>
                </div>
              </div>
            </div>

            {/* After */}
            <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#0f0f0f", clipPath: `inset(0 ${100 - pct}% 0 0)` }}>
              <div style={{ textAlign: "center", padding: 24, width: "100%" }}>
                <div style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 8, width: 300, margin: "0 auto", overflow: "hidden" }}>
                  <div style={{ background: "rgba(255,255,255,.07)", padding: "8px 12px", display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(255,100,100,.4)" }} />
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(255,200,100,.4)" }} />
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(100,200,100,.4)" }} />
                    <div style={{ flex: 1, background: "rgba(255,255,255,.06)", borderRadius: 4, padding: "3px 10px", fontSize: 9, color: "rgba(255,255,255,.2)", marginLeft: 6 }}>queloric.com</div>
                  </div>
                  <div style={{ background: "rgba(255,255,255,.05)", padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "#fff" }}>Queloric<span style={{ color: "#6366f1" }}>.</span></span>
                    <div style={{ display: "flex", gap: 6 }}>
                      {[22,22,22].map((w,i) => <div key={i} style={{ background: "rgba(255,255,255,.07)", height: 7, width: w, borderRadius: 2 }} />)}
                    </div>
                    <div style={{ background: "#4f46e5", borderRadius: 4, padding: "4px 10px", fontSize: 8, color: "#fff", fontWeight: 600, animation: "pulse-accent 2s infinite" }}>Quote →</div>
                  </div>
                  <div style={{ padding: "16px 14px", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
                    <div style={{ background: "rgba(99,102,241,.3)", borderRadius: 10, padding: "2px 8px", fontSize: 7, color: "#a5b4fc", display: "inline-block", marginBottom: 8, fontWeight: 600, letterSpacing: ".05em" }}>AI &amp; WEB AGENCY</div>
                    <div style={{ background: "rgba(255,255,255,.15)", height: 10, width: "75%", borderRadius: 3, marginBottom: 5 }} />
                    <div style={{ background: "rgba(255,255,255,.07)", height: 7, width: "55%", borderRadius: 3, marginBottom: 5 }} />
                    <div style={{ background: "rgba(255,255,255,.04)", height: 7, width: "40%", borderRadius: 3, marginBottom: 10 }} />
                    <div style={{ display: "flex", gap: 6 }}>
                      <div style={{ background: "#4f46e5", height: 22, width: 80, borderRadius: 5, animation: "pulse-accent 2s infinite .3s" }} />
                      <div style={{ background: "rgba(255,255,255,.07)", height: 22, width: 60, borderRadius: 5, border: "1px solid rgba(255,255,255,.1)" }} />
                    </div>
                  </div>
                  <div style={{ padding: "5px 14px", background: "rgba(79,70,229,.15)", display: "flex", gap: 8, justifyContent: "center", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
                    {["⚡ From 50€","🚀 2–5 days","📦 Own the code"].map(t => <span key={t} style={{ fontSize: 7, color: "rgba(255,255,255,.35)" }}>{t}</span>)}
                  </div>
                  <div style={{ padding: "10px 14px" }}>
                    <div style={{ fontSize: 7, color: "#6366f1", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 8 }}>Services</div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 6 }}>
                      {[["🌐","float 3s ease-in-out infinite"],["🤖","float 3s ease-in-out infinite .5s"],["⚡","float 3s ease-in-out infinite 1s"]].map(([icon, anim]) => (
                        <div key={icon as string} style={{ background: "rgba(255,255,255,.06)", height: 36, borderRadius: 6, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3, animation: anim as string }}>
                          <div style={{ fontSize: 10 }}>{icon}</div>
                          <div style={{ height: 5, width: 24, background: "rgba(255,255,255,.1)", borderRadius: 2 }} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div style={{ position: "absolute", top: 0, left: `${pct}%`, width: 2, height: "100%", background: "#fff", zIndex: 3, pointerEvents: "none" }} />
            {/* Handle */}
            <div style={{ position: "absolute", top: "50%", left: `${pct}%`, transform: "translate(-50%,-50%)", width: 40, height: 40, borderRadius: "50%", background: "#fff", boxShadow: "0 2px 12px rgba(0,0,0,.3)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 4, fontSize: 14, pointerEvents: "none", color: "var(--accent)", fontWeight: 700 }}>⟺</div>
            {/* Labels */}
            <div style={{ position: "absolute", top: 16, left: 16, background: "rgba(0,0,0,.6)", color: "#fff", padding: "6px 14px", borderRadius: 6, fontSize: 12, fontWeight: 600, zIndex: 5, pointerEvents: "none" }}>Before</div>
            <div style={{ position: "absolute", top: 16, right: 16, background: "var(--accent)", color: "#fff", padding: "6px 14px", borderRadius: 6, fontSize: 12, fontWeight: 600, zIndex: 5, pointerEvents: "none" }}>After</div>
          </div>
        </div>
      </div>
    </section>
  );
}
