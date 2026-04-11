"use client";

// ─── ProcoreConnect ───────────────────────────────────────────────────────
// Shows a "Connect to Procore" button when the user is not authenticated,
// and a welcome message + disconnect button when they are.
// Calls /api/auth/me on mount to check current auth state.

import { useEffect, useState } from "react";

interface ProcoreUser {
  id: number;
  login: string;
  name: string;
}

export default function ProcoreConnect() {
  const [user, setUser] = useState<ProcoreUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.authenticated && data.user) {
          setUser(data.user);
        }
      })
      .catch(() => {/* not connected — that's fine */})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
        <span className="animate-pulse">Checking Procore connection…</span>
      </div>
    );
  }

  if (user) {
    return (
      <div className="flex items-center justify-between rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
          <span className="font-medium text-green-800">
            Connected to Procore as <span className="font-semibold">{user.name}</span>
          </span>
        </div>
        <a
          href="/api/auth/logout"
          className="text-xs text-green-600 underline hover:text-green-800"
        >
          Disconnect
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-orange-200 bg-orange-50 px-4 py-4 text-sm">
      <p className="text-center text-gray-600">
        Connect your Procore account to fetch projects and ITP data directly.
      </p>
      <a
        href="/api/auth/login"
        className="inline-flex items-center gap-2 rounded-md bg-orange-500 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-orange-600 transition-colors"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
        </svg>
        Connect to Procore
      </a>
    </div>
  );
}
