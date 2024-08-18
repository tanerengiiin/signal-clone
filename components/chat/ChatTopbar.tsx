"use client";
import React from "react";
import { CHAT_TOPBAR_NAV } from "@/lib/constants";
import { Button } from "../ui/button";
import { UsersIcon } from "@heroicons/react/24/outline";
import { useChatContext } from "../chat-context-provider";
const ChatTopbar = () => {
  const { handleChatDetail,chatName } = useChatContext();
  return (
    <div className="sticky top-0 z-20 bg-background pt-4 pb-3 px-5 flex items-center gap-4">
      <div
        onClick={() => handleChatDetail()}
        className="cursor-pointer flex items-center flex-1 gap-4 select-none"
      >
        <div className="w-8 h-8 mx-auto rounded-full bg-blue-600/20 dark:bg-blue-500/20 flex items-center justify-center">
          <UsersIcon className="w-4 h-4 text-blue-600" />
        </div>
        <div className="flex-1">
          <h1 className="font-semibold">{chatName}</h1>
        </div>
      </div>
      <ul className="flex items-center gap-2">
        {CHAT_TOPBAR_NAV.map((item, index) => (
          <li key={index}>
            <Button
              size={"icon"}
              variant={"ghost"}
              className="hover:bg-primary/5 dark:hover:bg-primary/10 text-primary"
            >
              <item.icon className="w-5 h-5" />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatTopbar;
