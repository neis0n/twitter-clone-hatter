"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="fixed top-0 left-0 w-full bg-blue-600 text-white shadow-md z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* Logo */}
        <h1 className="text-lg font-semibold tracking-wide">
          <Link href="/">Hatter</Link>
        </h1>

        {/* User info */}
        <nav className="flex items-center gap-4">

          {status === "loading" && (
            <span className="opacity-80 text-sm">Loading…</span>
          )}

          {status === "unauthenticated" && (
            <button
              onClick={() => signIn()}
              className="px-3 py-1.5 bg-green-600 hover:bg-green-700 rounded-md text-sm transition cursor-pointer"
            >
              Login
            </button>
          )}

          {status === "authenticated" && (
            <div className="flex items-center gap-4">
              {/* Avatar and Username */}
              <Link href={`/users/${session.user.username}`}>
                <img
                  src={session.user.avatarUrl}
                  alt={session.user.username}
                  className="w-10 h-10 rounded-full object-cover border border-white/30"
                />
              </Link>
              
              <Link href={`/users/${session.user.username}`}>
                <span className="text-sm text-white hidden sm:block font-medium">
                  You are not welcome here, {session.user?.name}
                </span>
              </Link>

              {/* Logout Button */}
              <button
                onClick={() => signOut()}
                className="px-3 py-1.5 bg-red-600 hover:bg-red-700 rounded-md text-sm transition cursor-pointer"
              >
                Logout
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}