import { cookies } from "next/headers";
import Link from "next/link";
import HoldpointLogo from "@/components/HoldpointLogo";
import UploadPortal from "@/components/UploadPortal";
import ProcoreConnect from "@/components/ProcoreConnect";
import ProcoreImport from "@/components/ProcoreImport";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const isUnauthorized = params.error === "unauthorized";

  const cookieStore = await cookies();
  const isAuthenticated = !!cookieStore.get("procore_access_token")?.value;

  // ── Unauthenticated: landing page ──────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col min-h-full">

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section
          className="flex flex-col items-center justify-center text-center"
          style={{
            background: "linear-gradient(160deg, #3D2E1E 0%, #6B5A42 60%, #8C7258 100%)",
            minHeight: 520,
            padding: "80px 40px",
          }}
        >
          {isUnauthorized && (
            <div
              className="mb-10 rounded-xl px-5 py-3 text-sm max-w-sm mx-auto"
              style={{ border: "1px solid rgba(255,100,100,0.3)", backgroundColor: "rgba(220,50,50,0.15)" }}
            >
              <p className="font-semibold" style={{ color: "rgba(255,180,180,1)" }}>Access restricted.</p>
              <p className="text-xs mt-0.5" style={{ color: "rgba(255,160,160,0.8)" }}>
                Please contact your administrator.
              </p>
            </div>
          )}

          {/* Logo */}
          <HoldpointLogo variant="dark" size={72} />

          {/* Wordmark */}
          <h1
            className="mt-5 text-white"
            style={{ fontSize: 58, fontWeight: 700, letterSpacing: "-2px", lineHeight: 1 }}
          >
            Holdpoint
          </h1>

          {/* Tagline */}
          <p
            className="mt-3 uppercase"
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "2px",
              fontWeight: 300,
            }}
          >
            Quality Assurance Platform
          </p>

          {/* Amber divider */}
          <div
            style={{
              width: 40,
              height: 2,
              backgroundColor: "#C4924A",
              margin: "24px auto",
              borderRadius: 1,
            }}
          />

          {/* Description */}
          <p
            className="mx-auto"
            style={{
              fontSize: 16,
              color: "rgba(255,255,255,0.65)",
              maxWidth: 440,
              lineHeight: 1.7,
              fontWeight: 300,
            }}
          >
            Automated ITP scoring for Procore inspection packages. Know
            what&apos;s missing, what needs fixing, and what can be
            closed — automatically.
          </p>

          {/* CTA */}
          <a
            href="/api/auth/login"
            className="mt-8 inline-block font-semibold text-white transition-opacity hover:opacity-90"
            style={{
              backgroundColor: "#C4924A",
              fontSize: 14,
              padding: "14px 32px",
              borderRadius: 8,
            }}
          >
            Connect to Procore to Get Started
          </a>
        </section>

        {/* ── Stats strip ───────────────────────────────────────────────────── */}
        <div
          className="flex items-start justify-center flex-wrap gap-16"
          style={{
            backgroundColor: "var(--hp-surface)",
            borderBottom: "1px solid var(--hp-border)",
            padding: "40px 48px",
          }}
        >
          {[
            { number: "5",    label: "Evidence dimensions scored" },
            { number: "3",    label: "Risk tiers" },
            { number: "4",    label: "Rating bands" },
            { number: "<60s", label: "Per ITP review" },
          ].map(({ number, label }) => (
            <div key={label} className="text-center">
              <p
                style={{
                  fontSize: 32,
                  fontWeight: 600,
                  color: "var(--hp-warm-900)",
                  letterSpacing: "-1px",
                  lineHeight: 1,
                }}
              >
                {number}
              </p>
              <p
                style={{
                  fontSize: 12,
                  color: "var(--hp-text-muted)",
                  marginTop: 4,
                  letterSpacing: "0.3px",
                }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* ── How it works teaser ───────────────────────────────────────────── */}
        <div
          className="flex-1 flex items-center justify-center"
          style={{ backgroundColor: "var(--hp-bg)" }}
        >
          <Link
            href="/how-it-works"
            className="text-sm font-medium transition-colors"
            style={{ color: "var(--hp-text-secondary)" }}
          >
            Learn how it works →
          </Link>
        </div>

        {/* ── Footer ────────────────────────────────────────────────────────── */}
        <footer
          className="flex items-center justify-between"
          style={{
            backgroundColor: "var(--hp-surface)",
            borderTop: "1px solid var(--hp-border)",
            padding: "20px 48px",
          }}
        >
          <span style={{ fontSize: 12, color: "var(--hp-text-muted)" }}>Holdpoint</span>
          <span style={{ fontSize: 12, color: "var(--hp-text-muted)" }}>Quality Assurance Platform</span>
        </footer>

      </div>
    );
  }

  // ── Authenticated: upload interface ────────────────────────────────────────
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      {isUnauthorized && (
        <div className="mb-6 rounded-xl px-4 py-3 text-center" style={{ border: "1px solid var(--hp-border)", backgroundColor: "var(--hp-warm-100)" }}>
          <p className="text-sm font-semibold" style={{ color: "var(--hp-warm-800)" }}>Access restricted.</p>
          <p className="text-xs mt-0.5" style={{ color: "var(--hp-text-secondary)" }}>
            Please contact your administrator.
          </p>
        </div>
      )}

      <header className="mb-8 text-center">
        <div className="flex flex-col items-center gap-2 mb-3">
          <HoldpointLogo variant="light" size={32} />
          <p className="text-base font-bold tracking-wide" style={{ color: "var(--hp-warm-800)" }}>Holdpoint</p>
        </div>
        <p className="text-sm max-w-md mx-auto leading-relaxed" style={{ color: "var(--hp-text-secondary)" }}>
          Upload the documents from one inspection package. Claude will identify
          the project details automatically and tell you what&apos;s complete,
          what&apos;s missing, and what to do next.
        </p>
      </header>

      <div className="mb-6">
        <ProcoreConnect />
      </div>

      <ProcoreImport />

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t" style={{ borderColor: "var(--hp-border)" }} />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="px-3 font-medium tracking-wide" style={{ backgroundColor: "var(--hp-bg)", color: "var(--hp-text-muted)" }}>
            or upload manually
          </span>
        </div>
      </div>

      <UploadPortal />

      <footer className="mt-12 text-center text-xs" style={{ color: "var(--hp-text-muted)" }}>
        Your documents are sent to Claude for analysis only — nothing is stored on
        this server.
      </footer>
    </main>
  );
}
