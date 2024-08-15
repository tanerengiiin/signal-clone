import {
  ArrowUturnLeftIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { useChatContext } from "../chat-context-provider";
import { Message } from "@/lib/types";

type ChatToolbarProps = {
  item: Message;
  messageType: "receiver" | "sender";
};

const ChatToolBar = ({ item, messageType }: ChatToolbarProps) => {
  const { handleRepliedMessage } = useChatContext();
  return (
    <div
      className={`group-hover:opacity-100 opacity-0 transition-all flex items-center gap-2 ${
        messageType === "receiver" ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <button className="text-primary/60 hover:text-primary transition-all">
        <EllipsisHorizontalIcon className="w-6 h-6" />
      </button>
      <button
        onClick={() =>
          handleRepliedMessage({
            message: item.message,
            username: item.username,
          })
        }
        className="lg:block hidden text-primary/60 hover:text-primary transition-all"
      >
        <ArrowUturnLeftIcon className="w-5 h-5" />
      </button>
      <button className="lg:block hidden text-primary/60 hover:text-primary transition-all">
        <HeartIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ChatToolBar;
