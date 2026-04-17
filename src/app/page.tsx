import UploadPortal from "@/components/UploadPortal";
import ProcoreConnect from "@/components/ProcoreConnect";
import ProcoreImport from "@/components/ProcoreImport";

export default function Home() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">

      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          <span className="text-yellow-400">Fleek Constructions</span>
        </h1>
        <p className="mt-1 text-base font-semibold text-gray-500 tracking-wide">
          ITP QA Reviewer
        </p>
        <p className="mt-3 text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
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
          <span className="bg-white px-3 text-gray-400 font-medium tracking-wide">or upload manually</span>
        </div>
      </div>

      <UploadPortal />

      <footer className="mt-12 text-center text-xs text-gray-400">
        Your documents are sent to Claude for analysis only — nothing is stored on this server.
      </footer>

    </main>
  );
}
