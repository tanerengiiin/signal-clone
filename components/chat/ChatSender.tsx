import { ChatMessageType } from "@/lib/types";
import React from "react";
import ChatToolbar from "./ChatToolbar";

const ChatSender = ({
  prevId,
  nextId,
  item
}: ChatMessageType) => {
  const {id, message, created_at, username, profilePic, email} = item;
  return (
    <div
      className={`group flex items-center justify-end gap-2.5 ml-auto mr-0 w-full ${
        email === nextId ? "mb-0.5" : "mb-2.5"
      }`}
    >
      <ChatToolbar messageType="sender" item={item}/>
      <div
        className={`max-w-[85%] lg:max-w-[75%] rounded-bl-2xl rounded-tl-2xl w-fit px-2.5 py-2 text-sm inline-flex items-end gap-2 text-blue-50 bg-[#266DF0] shadow-[inset_0px_0px_0px_1px_rgba(35,37,41,0.1),0px_2px_4px_-2px_rgba(38,109,240,0.12),0px_3px_6px_-2px_rgba(38,109,240,0.08);]
          ${email === nextId ? "rounded-br-md" : "rounded-br-2xl"}
           ${email === prevId ? "rounded-tr-md" : "rounded-tr-2xl"}
          `}
      >
        {message}
        <span className="text-xs font-light leading-tight opacity-80 whitespace-nowrap">
          {new Date(created_at).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </span>
      </div>
    </div>
  );
};

export default ChatSender;
