"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormData {
  service: string;
  description: string;
  reference: string;
  timeline: string;
  budget: string;
  name: string;
  email: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const services = [
  { id: "website-design", label: "Website Design", icon: "🌐" },
  { id: "ai-chatbot", label: "AI Chatbot", icon: "🤖" },
  { id: "telegram-discord-bot", label: "Telegram / Discord Bot", icon: "💬" },
  { id: "workflow-automation", label: "Workflow Automation", icon: "⚡" },
  { id: "website-management", label: "Website Management", icon: "🛠️" },
  { id: "seo-content", label: "SEO & Content", icon: "📈" },
  { id: "api-backend", label: "API / Backend", icon: "🔌" },
  { id: "something-else", label: "Something else", icon: "✨" },
];

const budgets = [
  { id: "under-100", label: "Under 100€" },
  { id: "100-300", label: "100 – 300€" },
  { id: "300-600", label: "300 – 600€" },
  { id: "600-1000", label: "600 – 1,000€" },
  { id: "1000-plus", label: "1,000+€" },
  { id: "not-sure", label: "Not sure yet" },
];

const TOTAL_STEPS = 4;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function QuotePage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>({
    service: "",
    description: "",
    reference: "",
    timeline: "",
    budget: "",
    name: "",
    email: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // ── Derived ──────────────────────────────────────────────────────────────────

  const canAdvance =
    step === 1 ? !!form.service :
    step === 2 ? !!form.description.trim() :
    step === 3 ? !!form.budget :
    !!(form.name.trim() && form.email.trim());

  // ── Handlers ─────────────────────────────────────────────────────────────────

  function next() {
    if (canAdvance && step < TOTAL_STEPS) setStep(s => s + 1);
  }

  function back() {
    if (step > 1) setStep(s => s - 1);
  }

  async function submit() {
    if (!canAdvance) return;
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  // ── Styles ───────────────────────────────────────────────────────────────────

  const bg = isDark ? "var(--background)" : "#ffffff";
  const cardBg = isDark ? "#111111" : "#f8f8f8";
  const cardBorder = isDark ? "1px solid #2a2a2a" : "1px solid var(--border)";
  const selectedBorder = "2px solid #4f46e5";
  const selectedBg = isDark ? "rgba(79,70,229,.18)" : "#eef2ff";
  const inputBg = isDark ? "#111111" : "#ffffff";
  const inputBorder = isDark ? "1px solid #2a2a2a" : "1px solid var(--border)";
  const labelColor = isDark ? "rgba(255,255,255,.55)" : "var(--q-mid)";
  const headingColor = isDark ? "#ffffff" : "var(--q-black)";
  const subColor = isDark ? "rgba(255,255,255,.45)" : "var(--q-muted)";

  // ── Success screen ───────────────────────────────────────────────────────────

  if (submitted) {
    return (
      <>
        <Navbar />
        <main style={{ background: bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "120px 24px 80px" }}>
          <div style={{ textAlign: "center", maxWidth: 480 }}>
            <div style={{ fontSize: 56, marginBottom: 20 }}>🎉</div>
            <h1 style={{ fontSize: "clamp(26px,4vw,36px)", fontWeight: 800, color: headingColor, letterSpacing: "-.03em", marginBottom: 12 }}>
              We got your request!
            </h1>
            <p style={{ fontSize: 16, color: subColor, lineHeight: 1.6, marginBottom: 32 }}>
              Thanks {form.name.split(" ")[0]}! We&apos;ll review your project and get back to you at <strong style={{ color: headingColor }}>{form.email}</strong> within 24 hours.
            </p>
            <a
              href="/"
              style={{ background: "#4f46e5", color: "#fff", padding: "12px 28px", borderRadius: 30, fontSize: 14, fontWeight: 600, textDecoration: "none", display: "inline-block" }}
            >
              Back to home →
            </a>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // ── Main render ──────────────────────────────────────────────────────────────

  return (
    <>
      <Navbar />

      <main style={{ background: bg, minHeight: "100vh", padding: "120px 24px 80px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ display: "inline-block", background: isDark ? "rgba(79,70,229,.15)" : "#eef2ff", color: "#6366f1", fontSize: 12, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", padding: "5px 14px", borderRadius: 30, marginBottom: 16 }}>
              Get a quote
            </div>
            <h1 style={{ fontSize: "clamp(28px,4vw,40px)", fontWeight: 800, color: headingColor, letterSpacing: "-.03em", margin: 0 }}>
              Tell us about your project
            </h1>
            <p style={{ fontSize: 15, color: subColor, marginTop: 10, lineHeight: 1.5 }}>
              A few quick questions so we can give you an accurate estimate.
            </p>
          </div>

          {/* Progress bar */}
          <ProgressStepper step={step} total={TOTAL_STEPS} isDark={isDark} />

          {/* Form card */}
          <div style={{ background: cardBg, border: cardBorder, borderRadius: 16, padding: "36px 32px", marginTop: 32 }}>

            {step === 1 && (
              <Step1
                selected={form.service}
                onSelect={(id) => setForm(f => ({ ...f, service: id }))}
                isDark={isDark}
                selectedBg={selectedBg}
                selectedBorder={selectedBorder}
                cardBg={isDark ? "#1a1a1a" : "#ffffff"}
                cardBorder={cardBorder}
                headingColor={headingColor}
                subColor={subColor}
              />
            )}

            {step === 2 && (
              <Step2
                form={form}
                onChange={(k, v) => setForm(f => ({ ...f, [k]: v }))}
                isDark={isDark}
                inputBg={inputBg}
                inputBorder={inputBorder}
                labelColor={labelColor}
                headingColor={headingColor}
                subColor={subColor}
              />
            )}

            {step === 3 && (
              <Step3
                selected={form.budget}
                onSelect={(id) => setForm(f => ({ ...f, budget: id }))}
                isDark={isDark}
                selectedBg={selectedBg}
                selectedBorder={selectedBorder}
                cardBg={isDark ? "#1a1a1a" : "#ffffff"}
                cardBorder={cardBorder}
                headingColor={headingColor}
                subColor={subColor}
              />
            )}

            {step === 4 && (
              <Step4
                form={form}
                onChange={(k, v) => setForm(f => ({ ...f, [k]: v }))}
                isDark={isDark}
                inputBg={inputBg}
                inputBorder={inputBorder}
                labelColor={labelColor}
                headingColor={headingColor}
                subColor={subColor}
              />
            )}

            {/* Navigation */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: step === 1 ? "flex-end" : "space-between", marginTop: 32, gap: 12 }}>
              {step > 1 && (
                <button
                  onClick={back}
                  style={{
                    background: "transparent",
                    border: isDark ? "1px solid #3a3a3a" : "1px solid var(--border)",
                    color: isDark ? "rgba(255,255,255,.6)" : "var(--q-mid)",
                    padding: "11px 24px", borderRadius: 30, fontSize: 14,
                    fontWeight: 500, cursor: "pointer", fontFamily: "inherit",
                    transition: "border-color .15s, color .15s",
                  }}
                >
                  ← Back
                </button>
              )}

              {step < TOTAL_STEPS ? (
                <button
                  onClick={next}
                  disabled={!canAdvance}
                  style={{
                    background: canAdvance ? "#4f46e5" : isDark ? "#2a2a2a" : "#e8e8e8",
                    color: canAdvance ? "#fff" : isDark ? "rgba(255,255,255,.25)" : "rgba(0,0,0,.3)",
                    padding: "11px 28px", borderRadius: 30, fontSize: 14,
                    fontWeight: 600, cursor: canAdvance ? "pointer" : "not-allowed",
                    border: "none", fontFamily: "inherit", transition: "background .15s, color .15s",
                  }}
                >
                  Next →
                </button>
              ) : (
                <button
                  onClick={submit}
                  disabled={!canAdvance || submitting}
                  style={{
                    background: canAdvance && !submitting ? "#4f46e5" : isDark ? "#2a2a2a" : "#e8e8e8",
                    color: canAdvance && !submitting ? "#fff" : isDark ? "rgba(255,255,255,.25)" : "rgba(0,0,0,.3)",
                    padding: "11px 28px", borderRadius: 30, fontSize: 14,
                    fontWeight: 600, cursor: canAdvance && !submitting ? "pointer" : "not-allowed",
                    border: "none", fontFamily: "inherit", transition: "background .15s",
                  }}
                >
                  {submitting ? "Sending…" : "Submit request →"}
                </button>
              )}
            </div>

            {error && (
              <p style={{ color: "#ef4444", fontSize: 13, marginTop: 12, textAlign: "center" }}>{error}</p>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}

// ─── Progress Stepper ─────────────────────────────────────────────────────────

function ProgressStepper({ step, total, isDark }: { step: number; total: number; isDark: boolean }) {
  const trackBg = isDark ? "#1a1a1a" : "#e8e8e8";
  const pct = ((step - 1) / (total - 1)) * 100;

  return (
    <div>
      {/* Step labels */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
        {Array.from({ length: total }, (_, i) => {
          const n = i + 1;
          const active = n === step;
          const done = n < step;
          return (
            <div key={n} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                background: done ? "#4f46e5" : active ? "#4f46e5" : isDark ? "#2a2a2a" : "#e8e8e8",
                color: done || active ? "#fff" : isDark ? "rgba(255,255,255,.3)" : "rgba(0,0,0,.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 700, transition: "background .2s",
              }}>
                {done ? "✓" : n}
              </div>
              <div style={{ fontSize: 11, marginTop: 4, color: active ? "#4f46e5" : isDark ? "rgba(255,255,255,.3)" : "rgba(0,0,0,.3)", fontWeight: active ? 600 : 400 }}>
                {["Service", "Details", "Budget", "Contact"][i]}
              </div>
            </div>
          );
        })}
      </div>

      {/* Track */}
      <div style={{ position: "relative", height: 3, background: trackBg, borderRadius: 2, margin: "0 14px" }}>
        <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${pct}%`, background: "#4f46e5", borderRadius: 2, transition: "width .3s ease" }} />
      </div>
    </div>
  );
}

// ─── Step 1 — Service selection ───────────────────────────────────────────────

interface Step1Props {
  selected: string;
  onSelect: (id: string) => void;
  isDark: boolean;
  selectedBg: string;
  selectedBorder: string;
  cardBg: string;
  cardBorder: string;
  headingColor: string;
  subColor: string;
}

function Step1({ selected, onSelect, isDark, selectedBg, selectedBorder, cardBg, cardBorder, headingColor, subColor }: Step1Props) {
  return (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: headingColor, letterSpacing: "-.02em", margin: "0 0 6px" }}>
        What do you need built?
      </h2>
      <p style={{ fontSize: 14, color: subColor, marginBottom: 24 }}>Select the service that best matches your project.</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
        {services.map((s) => {
          const isSelected = selected === s.id;
          return (
            <button
              key={s.id}
              onClick={() => onSelect(s.id)}
              style={{
                background: isSelected ? selectedBg : cardBg,
                border: isSelected ? selectedBorder : cardBorder,
                borderRadius: 12,
                padding: "16px 14px",
                cursor: "pointer",
                textAlign: "left",
                display: "flex",
                flexDirection: "column",
                gap: 8,
                transition: "background .15s, border-color .15s",
                fontFamily: "inherit",
              }}
            >
              <span style={{ fontSize: 24, lineHeight: 1 }}>{s.icon}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: isSelected ? "#4f46e5" : isDark ? "rgba(255,255,255,.8)" : "var(--q-dark)", lineHeight: 1.3 }}>
                {s.label}
              </span>
            </button>
          );
        })}
      </div>
      <style>{`
        @media (max-width: 480px) {
          .service-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

// ─── Step 2 — Project details ─────────────────────────────────────────────────

interface Step2Props {
  form: FormData;
  onChange: (k: keyof FormData, v: string) => void;
  isDark: boolean;
  inputBg: string;
  inputBorder: string;
  labelColor: string;
  headingColor: string;
  subColor: string;
}

function Step2({ form, onChange, isDark, inputBg, inputBorder, labelColor, headingColor, subColor }: Step2Props) {
  const inputStyle = {
    width: "100%", background: inputBg, border: inputBorder,
    borderRadius: 10, padding: "11px 14px", fontSize: 14,
    color: isDark ? "#ffffff" : "var(--q-black)", fontFamily: "inherit",
    outline: "none", boxSizing: "border-box" as const,
    transition: "border-color .15s",
  };

  return (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: headingColor, letterSpacing: "-.02em", margin: "0 0 6px" }}>
        Tell us about your project
      </h2>
      <p style={{ fontSize: 14, color: subColor, marginBottom: 24 }}>The more detail you share, the better our estimate.</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 500, color: labelColor }}>
            Describe your project <span style={{ color: "#4f46e5" }}>*</span>
          </span>
          <textarea
            value={form.description}
            onChange={e => onChange("description", e.target.value)}
            placeholder="E.g. I need a landing page for my SaaS with a waitlist signup and pricing table…"
            rows={5}
            style={{ ...inputStyle, resize: "vertical" as const, lineHeight: 1.6 }}
          />
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 500, color: labelColor }}>
            Reference website <span style={{ color: subColor, fontWeight: 400 }}>(optional)</span>
          </span>
          <input
            type="url"
            value={form.reference}
            onChange={e => onChange("reference", e.target.value)}
            placeholder="https://example.com"
            style={inputStyle}
          />
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 500, color: labelColor }}>
            Timeline <span style={{ color: subColor, fontWeight: 400 }}>(optional)</span>
          </span>
          <input
            type="text"
            value={form.timeline}
            onChange={e => onChange("timeline", e.target.value)}
            placeholder="E.g. Within 2 weeks, ASAP, no rush…"
            style={inputStyle}
          />
        </label>
      </div>
    </div>
  );
}

// ─── Step 3 — Budget ──────────────────────────────────────────────────────────

interface Step3Props {
  selected: string;
  onSelect: (id: string) => void;
  isDark: boolean;
  selectedBg: string;
  selectedBorder: string;
  cardBg: string;
  cardBorder: string;
  headingColor: string;
  subColor: string;
}

function Step3({ selected, onSelect, isDark, selectedBg, selectedBorder, cardBg, cardBorder, headingColor, subColor }: Step3Props) {
  return (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: headingColor, letterSpacing: "-.02em", margin: "0 0 6px" }}>
        What&apos;s your budget?
      </h2>
      <p style={{ fontSize: 14, color: subColor, marginBottom: 24 }}>Pick the range that works for you — no commitment.</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
        {budgets.map((b) => {
          const isSelected = selected === b.id;
          return (
            <button
              key={b.id}
              onClick={() => onSelect(b.id)}
              style={{
                background: isSelected ? selectedBg : cardBg,
                border: isSelected ? selectedBorder : cardBorder,
                borderRadius: 12,
                padding: "18px 16px",
                cursor: "pointer",
                textAlign: "center",
                fontSize: 14,
                fontWeight: isSelected ? 600 : 500,
                color: isSelected ? "#4f46e5" : isDark ? "rgba(255,255,255,.75)" : "var(--q-dark)",
                transition: "background .15s, border-color .15s, color .15s",
                fontFamily: "inherit",
              }}
            >
              {b.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Step 4 — Contact ─────────────────────────────────────────────────────────

interface Step4Props {
  form: FormData;
  onChange: (k: keyof FormData, v: string) => void;
  isDark: boolean;
  inputBg: string;
  inputBorder: string;
  labelColor: string;
  headingColor: string;
  subColor: string;
}

function Step4({ form, onChange, isDark, inputBg, inputBorder, labelColor, headingColor, subColor }: Step4Props) {
  const inputStyle = {
    width: "100%", background: inputBg, border: inputBorder,
    borderRadius: 10, padding: "11px 14px", fontSize: 14,
    color: isDark ? "#ffffff" : "var(--q-black)", fontFamily: "inherit",
    outline: "none", boxSizing: "border-box" as const,
    transition: "border-color .15s",
  };

  return (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: headingColor, letterSpacing: "-.02em", margin: "0 0 6px" }}>
        Almost done — how do we reach you?
      </h2>
      <p style={{ fontSize: 14, color: subColor, marginBottom: 24 }}>We&apos;ll send your estimate here within 24 hours.</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 500, color: labelColor }}>
            Full name <span style={{ color: "#4f46e5" }}>*</span>
          </span>
          <input
            type="text"
            value={form.name}
            onChange={e => onChange("name", e.target.value)}
            placeholder="Jane Smith"
            style={inputStyle}
            autoComplete="name"
          />
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 500, color: labelColor }}>
            Email address <span style={{ color: "#4f46e5" }}>*</span>
          </span>
          <input
            type="email"
            value={form.email}
            onChange={e => onChange("email", e.target.value)}
            placeholder="jane@example.com"
            style={inputStyle}
            autoComplete="email"
          />
        </label>
      </div>

      {/* Summary */}
      <div style={{ marginTop: 28, padding: "16px", background: isDark ? "rgba(79,70,229,.08)" : "#eef2ff", borderRadius: 10, border: "1px solid rgba(79,70,229,.15)" }}>
        <p style={{ fontSize: 12, fontWeight: 600, color: "#6366f1", textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 10 }}>Your request summary</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <SummaryRow label="Service" value={services.find(s => s.id === form.service)?.label ?? "—"} isDark={isDark} />
          <SummaryRow label="Budget" value={budgets.find(b => b.id === form.budget)?.label ?? "—"} isDark={isDark} />
          {form.timeline && <SummaryRow label="Timeline" value={form.timeline} isDark={isDark} />}
        </div>
      </div>
    </div>
  );
}

function SummaryRow({ label, value, isDark }: { label: string; value: string; isDark: boolean }) {
  return (
    <div style={{ display: "flex", gap: 8, fontSize: 13 }}>
      <span style={{ color: isDark ? "rgba(255,255,255,.4)" : "var(--q-muted)", width: 64, flexShrink: 0 }}>{label}</span>
      <span style={{ color: isDark ? "rgba(255,255,255,.75)" : "var(--q-dark)", fontWeight: 500 }}>{value}</span>
    </div>
  );
}
