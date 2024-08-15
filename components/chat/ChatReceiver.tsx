import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChatMessageType } from "@/lib/types";
import ChatToolBar from "./ChatToolbar";

const ChatReceiver = ({ prevId, nextId, item }: ChatMessageType) => {
  const { id, message, created_at, username, profilePic, email } = item;
  return (
    <div
      className={`group flex items-center gap-2.5 w-full ${
        email === nextId ? "mb-0.5" : "mb-2.5"
      }`}
    >
      <div className="flex items-end gap-2 max-w-[85%] lg:max-w-[75%]">
        {nextId === email ? (
          <div className="w-7 h-7" />
        ) : (
          <Avatar className="w-7 h-7 mb-0.5 cursor-pointer">
            <AvatarImage src={profilePic} />
            <AvatarFallback className="text-[10px] font-medium bg-blue-600/15 dark:bg-blue-500/30 text-blue-500">
              CN
            </AvatarFallback>
          </Avatar>
        )}
        <div
          className={`rounded-br-2xl rounded-tr-2xl w-fit px-2.5 py-2 text-sm  text-primary bg-primary/5 dark:bg-primary/10
          ${email === nextId ? "rounded-bl-md" : "rounded-bl-2xl"}
           ${email === prevId ? "rounded-tl-md" : "rounded-tl-2xl"}
          `}
        >
          {email === prevId ? null : (
            <div className="font-semibold text-sm mb-1 text-blue-600 dark:text-blue-500">
              {username}
            </div>
          )}
          <div className="inline-flex items-end gap-2">
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
      </div>
      <ChatToolBar messageType="receiver" item={item} />
    </div>
  );
};

export default ChatReceiver;
