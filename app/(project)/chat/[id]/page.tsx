import ChatAction from "@/components/chat/ChatAction";
import ChatDetail from "@/components/chat/ChatDetail";
import ChatScreen from "@/components/chat/ChatScreen";
import ChatTopbar from "@/components/chat/ChatTopbar";
import { Message } from "@/lib/types";
import { notFound } from "next/navigation";
import React from "react";

const ChatPage = async ({ params }: { params: { id: string } }) => {
  let messages: Message[] = [];
  try {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/getMessages/${params.id}`
    ).then((res) => res.json());

    messages = data?.messages;

  } catch (e) {
    console.log(e, 'error')
    notFound()
  }
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
