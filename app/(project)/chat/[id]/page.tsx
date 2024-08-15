import ChatAction from "@/components/chat/ChatAction";
import ChatDetail from "@/components/chat/ChatDetail";
import ChatScreen from "@/components/chat/ChatScreen";
import ChatTopbar from "@/components/chat/ChatTopbar";
import React from "react";

const ChatPage = ({ params }: { params: { id: string } }) => {
  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col gap-4 h-full overflow-auto">
        <ChatTopbar />
        <ChatScreen />
        <ChatAction />
      </div>
      <ChatDetail/>
    </div>
  );
};

export default ChatPage;
