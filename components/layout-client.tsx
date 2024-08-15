"use client"
import React from "react";
import { ChatProvider } from "./chat-context-provider";
import { SessionProvider } from "next-auth/react";

export default function LayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <ChatProvider>{children}</ChatProvider>
    </SessionProvider>
  );
}
