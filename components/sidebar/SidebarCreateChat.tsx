"use client";
import React from "react";
import { Button } from "../ui/button";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { v4 as uuid } from "uuid";
import { Chat } from "@/lib/types";

const SidebarCreateChat = () => {
  const handleClick = () => {
    const id = uuid();
    const chat: Chat = {
      id,
      chatName: "Managers Group",
      created_at: Date.now(),
      lastMessage: null
    };
    const uploadChatToUpstash = async () => {
      const data = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/createChat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat,
        }),
      }).then((res) => res.json());
      return data;
    };

    uploadChatToUpstash();
  };
  return null;
  return (
    <Button
      onClick={handleClick}
      size={"icon"}
      variant={"ghost"}
      className="hover:bg-primary/5 dark:hover:bg-primary/10 text-primary/80"
    >
      <PencilSquareIcon className="w-5 h-5" />
    </Button>
  );
};

export default SidebarCreateChat;
