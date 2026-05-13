import { cookies } from "next/headers";
import { Zap, Link2, FileText } from "lucide-react";
import UploadPortal from "@/components/UploadPortal";
import ProcoreConnect from "@/components/ProcoreConnect";
import ProcoreImport from "@/components/ProcoreImport";
import HoldpointLogo from "@/components/HoldpointLogo";

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
        {/* Hero */}
        <section className="text-white pt-14 pb-28 px-6" style={{ background: "linear-gradient(135deg, #5C4733 0%, #8C7258 100%)" }}>
          <div className="mx-auto max-w-2xl text-center">
            {isUnauthorized && (
              <div className="mb-8 rounded-xl border border-red-400/30 bg-red-500/20 px-4 py-3">
                <p className="text-sm font-semibold text-red-200">Access restricted.</p>
                <p className="text-xs text-red-300 mt-0.5">
                  You must be a Fleek Constructions team member to use this tool.
                </p>
              </div>
            )}
            <div className="flex flex-col items-center mb-6 gap-3">
              <HoldpointLogo variant="dark" size={44} />
              <h1 className="text-5xl font-bold leading-tight tracking-tight">
                Holdpoint
              </h1>
              <p className="text-white/45 text-sm -mt-1">by Fleek Constructions</p>
            </div>
            <p className="text-lg text-white/70 mb-10 leading-relaxed max-w-lg mx-auto">
              Automated quality assurance scoring for your Procore inspection
              packages. Powered by AI.
            </p>
            <a
              href="/api/auth/login"
              className="inline-block bg-[#D97706] text-white px-10 py-4 rounded-xl font-bold text-base hover:bg-amber-500 transition-colors shadow-lg shadow-black/20"
            >
              Connect to Procore to Get Started
            </a>
          </div>
        </section>

        {/* Feature cards — overlap the hero */}
        <section className="bg-[#F9FAFB] flex-1 px-6 pb-16">
          <div className="mx-auto max-w-4xl -mt-14">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="rounded-2xl bg-white border border-gray-100 shadow-md p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#1F3864]">
                  <Zap className="h-6 w-6 text-[#D97706]" />
                </div>
                <h3 className="text-sm font-bold text-[#1F3864] mb-2">AI-Powered Scoring</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Claude AI reads every attached document and scores packages across
                  five evidence dimensions using a calibrated quality framework.
                </p>
              </div>
              <div className="rounded-2xl bg-white border border-gray-100 shadow-md p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#1F3864]">
                  <Link2 className="h-6 w-6 text-[#D97706]" />
                </div>
                <h3 className="text-sm font-bold text-[#1F3864] mb-2">Procore Integration</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Connect directly to Procore and import closed ITP inspections
                  with all attachments fetched automatically.
                </p>
              </div>
              <div className="rounded-2xl bg-white border border-gray-100 shadow-md p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#1F3864]">
                  <FileText className="h-6 w-6 text-[#D97706]" />
                </div>
                <h3 className="text-sm font-bold text-[#1F3864] mb-2">Instant Reports</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Get a full QA report with score, rating band, evidence gaps, and
                  recommended next actions in seconds.
                </p>
              </div>
            </div>
          </div>
        </section>

        <footer className="bg-[#F9FAFB] border-t border-gray-100 py-6 text-center text-xs text-gray-400">
          Holdpoint — Fleek Constructions
        </footer>
      </div>
    );
  }

  // ── Authenticated: upload interface ────────────────────────────────────────
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      {isUnauthorized && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center">
          <p className="text-sm font-semibold text-red-700">Access restricted.</p>
          <p className="text-xs text-red-600 mt-0.5">
            You must be a Fleek Constructions team member to use this tool.
          </p>
        </div>
      )}

      <header className="mb-8 text-center">
        <div className="flex flex-col items-center gap-2 mb-3">
          <HoldpointLogo variant="light" size={32} />
          <p className="text-base font-bold text-[#5C4733] tracking-wide">Holdpoint</p>
        </div>
        <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
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
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-[#F9FAFB] px-3 text-gray-400 font-medium tracking-wide">
            or upload manually
          </span>
        </div>
      </div>

      <UploadPortal />

      <footer className="mt-12 text-center text-xs text-gray-400">
        Your documents are sent to Claude for analysis only — nothing is stored on
        this server.
      </footer>
    </main>
  );
}
