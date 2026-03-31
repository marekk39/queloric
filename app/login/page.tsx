"use client";

import { useState, FormEvent, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password, or account not yet active.");
    } else {
      router.push(callbackUrl);
    }
  }

  return (
    <>
      <Navbar />

      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--background)",
          padding: "120px 20px 60px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 420,
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: 16,
            padding: "40px 36px",
          }}
        >
          <div style={{ marginBottom: 28 }}>
            <div
              style={{
                fontSize: 22,
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "var(--foreground)",
                marginBottom: 6,
              }}
            >
              Partner Login
            </div>
            <p style={{ fontSize: 14, color: "var(--q-muted)", margin: 0 }}>
              Sign in to your Queloric partner account.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label
                htmlFor="email"
                style={{ fontSize: 13, fontWeight: 500, color: "var(--foreground)" }}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="you@example.com"
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: 8,
                  border: "1px solid var(--border)",
                  background: "var(--background)",
                  color: "var(--foreground)",
                  fontSize: 14,
                  fontFamily: "inherit",
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color .15s",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#4f46e5")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label
                htmlFor="password"
                style={{ fontSize: 13, fontWeight: 500, color: "var(--foreground)" }}
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="••••••••"
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: 8,
                  border: "1px solid var(--border)",
                  background: "var(--background)",
                  color: "var(--foreground)",
                  fontSize: 14,
                  fontFamily: "inherit",
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color .15s",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#4f46e5")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
              />
            </div>

            {error && (
              <p
                style={{
                  fontSize: 13,
                  color: "var(--destructive)",
                  margin: 0,
                  padding: "10px 14px",
                  background: "oklch(0.577 0.245 27.325 / 0.08)",
                  borderRadius: 8,
                  border: "1px solid oklch(0.577 0.245 27.325 / 0.2)",
                }}
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: 4,
                background: loading ? "var(--q-mid)" : "#4f46e5",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "11px 20px",
                fontSize: 14,
                fontWeight: 600,
                fontFamily: "inherit",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "opacity .15s",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
