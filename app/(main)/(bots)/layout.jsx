"use client";

import ChatProvider from "@/context/TextChatContext";

export default function BotLayout({ children }) {
  return <ChatProvider>{children}</ChatProvider>;
}
