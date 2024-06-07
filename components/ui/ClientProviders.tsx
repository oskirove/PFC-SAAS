"use client";
import { SessionProvider } from "next-auth/react";
import React, { Children } from "react";

export default function ClientProviders( {
    children,
}: {
    children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>
}

