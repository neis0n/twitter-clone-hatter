"use client";

import { SessionProvider } from "next-auth/react";
import { DislikesProvider } from "@/context/DislikesContext";

export default function ClientProviders({ children }) {
  return (
    <SessionProvider>
      <DislikesProvider>
        {children}
      </DislikesProvider>
    </SessionProvider>
  );
}