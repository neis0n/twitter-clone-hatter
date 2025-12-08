"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="bg-blue-500 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <h1 className="text-2xl font-bold">
          <Link href="/">Hatter</Link>
        </h1>

        {/* Navigation */}
        <nav className="flex items-center space-x-4">
          <Link href="/" className="hover:text-gray-200">
            Home
          </Link>

          {/* Buttons */}
          {status === "loading" && (
            <span className="opacity-70">Loading...</span>
          )}

          {status === "unauthenticated" && (
            <button
              onClick={() => signIn()}
              className="bg-green-500 px-3 py-1 rounded hover:bg-green-600"
            >
              Login
            </button>
          )}

          {status === "authenticated" && (
            <>
              <span className="text-white">
                You are not welcome here, {session.user?.name}
              </span>
              <button
                onClick={() => signOut()}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}