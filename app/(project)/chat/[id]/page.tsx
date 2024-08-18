import ChatAction from "@/components/chat/ChatAction";
import ChatDetail from "@/components/chat/ChatDetail";
import ChatScreen from "@/components/chat/ChatScreen";
import ChatTopbar from "@/components/chat/ChatTopbar";
import { Message } from "@/lib/types";
import redis from "@/redis";
import { notFound } from "next/navigation";
import React from "react";

const ChatPage = async ({ params }: { params: { id: string } }) => {
  const existingChat = await redis.hget("chats", params.id);
  if (existingChat === null) {
    notFound();
  }
  const messagesRes = await redis.hvals(params.id);
  const messages: Message[] = messagesRes
    .map((message) => JSON.parse(message))
    .sort((a, b) => b.created_at - a.created_at);
  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col h-full">
        <ChatTopbar />
        <ChatScreen initialMessages={messages} />
        <ChatAction initialMessages={messages} />
      </div>
      <ChatDetail />
    </div>
  );
};

export default ChatPage;
