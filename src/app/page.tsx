import UploadPortal from "@/components/UploadPortal";

export default function Home() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">

      <header className="mb-8 text-center">
        <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 tracking-wide uppercase">
          Powered by Claude AI
        </div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          QA Report
        </h1>
        <p className="mt-3 text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
          Upload the documents from one inspection package. Claude will identify
          the project details automatically and tell you what&apos;s complete,
          what&apos;s missing, and what to do next.
        </p>
      </header>

      <UploadPortal />

      <footer className="mt-12 text-center text-xs text-gray-400">
        Your documents are sent to Claude for analysis only — nothing is stored on this server.
      </footer>

    </main>
  );
}
