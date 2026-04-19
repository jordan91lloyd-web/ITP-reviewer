import type { Metadata } from "next";
import "./globals.css";
import GlobalNav from "@/components/GlobalNav";

export const metadata: Metadata = {
  title: "ITP QA Reviewer — Fleek Constructions",
  description: "AI-powered QA review of construction inspection and ITP document bundles",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col h-screen bg-[#F9FAFB] text-[#111827] antialiased">
        <GlobalNav />
        <div className="flex-1 min-h-0 overflow-y-auto">
          {children}
        </div>
      </body>
    </html>
  );
}
