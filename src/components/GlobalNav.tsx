"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface ProcoreUser {
  name?: string;
  login?: string;
}

export default function GlobalNav() {
  const [user, setUser] = useState<ProcoreUser | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then(r => r.json())
      .then(data => {
        if (data?.authenticated) setUser(data.user ?? {});
        setChecked(true);
      })
      .catch(() => setChecked(true));
  }, []);

  return (
    <nav className="bg-white border-b border-[#E5E7EB] h-14 flex items-center px-6 shrink-0 z-10 print:hidden">
      <div className="flex items-center justify-between w-full max-w-screen-2xl mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1">
          <span className="text-[#D97706] font-bold text-base">Fleek</span>
          <span className="text-[#1F3864] font-bold text-base"> Constructions</span>
        </Link>

        {/* Nav links + auth */}
        <div className="flex items-center gap-5">
          <Link
            href="/dashboard"
            className="text-sm text-gray-500 hover:text-[#1F3864] transition-colors font-medium"
          >
            Dashboard
          </Link>
          <Link
            href="/how-it-works"
            className="text-sm text-gray-500 hover:text-[#1F3864] transition-colors font-medium"
          >
            How it Works
          </Link>

          {checked && (
            user ? (
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <span className="text-xs text-gray-500 font-medium">
                  {user.name ?? user.login ?? "Connected"}
                </span>
                <a
                  href="/api/auth/logout"
                  className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                >
                  Disconnect
                </a>
              </div>
            ) : (
              <a
                href="/api/auth/login"
                className="rounded-lg bg-[#1F3864] px-4 py-2 text-xs font-semibold text-white hover:bg-[#253f77] transition-colors"
              >
                Connect to Procore
              </a>
            )
          )}
        </div>
      </div>
    </nav>
  );
}
