import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QA Report",
  description: "AI-powered QA review of construction inspection and ITP document bundles",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100 text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
