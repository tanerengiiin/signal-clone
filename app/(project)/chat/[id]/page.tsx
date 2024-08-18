import ChatAction from "@/components/chat/ChatAction";
import ChatDetail from "@/components/chat/ChatDetail";
import ChatScreen from "@/components/chat/ChatScreen";
import ChatTopbar from "@/components/chat/ChatTopbar";
import { Message } from "@/lib/types";
import React from "react";
const ChatPage = async ({ params }: { params: { id: string } }) => {
  const data = await fetch(
    `${process.env.VERCEL_URL}/api/getMessages/${params.id}`
  ).then((res) => res.json());

  const messages: Message[] = data.messages;
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
