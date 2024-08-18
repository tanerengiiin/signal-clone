"use client";
import React, { useEffect } from "react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { Chat } from "@/lib/types";
import { UsersIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { formatDate } from "@/lib/utils";
import { useChatContext } from "../chat-context-provider";

const ChatRow = ({ item }: { item: Chat }) => {
  const { handleChatName , chatName} = useChatContext()
  const { data: session } = useSession()
  const pathname = usePathname();
  const {
    data,
    error,
    mutate,
  } = useSWR<{ chat: Chat }>("/api/getChats/" + item.id, fetcher, { refreshInterval: 15000 });
  useEffect(() => {
    if(pathname==='/chat/'+item.id && item.chatName!==chatName){
      handleChatName(item.chatName)
    }
  }, [pathname])
  return (
    <Link
      href={"/chat/" + item.id}
      className={`flex items-start gap-2.5 px-3 py-2.5 rounded-xl hover:bg-primary/5 dark:hover:bg-primary/10 cursor-pointer transition-all ${pathname === "/chat/" + item.id ? "bg-primary/5 dark:bg-primary/10" : ""
        }`}
      onClick={() => handleChatName(item.chatName)}
    >
      <div className="w-12 h-12 rounded-full bg-blue-600/15 flex items-center justify-center">
        <UsersIcon className="w-6 h-6 text-blue-500" />
      </div>
      <div className="flex-1">
        <div className="font-semibold text-primary text-sm leading-none">
          {item.chatName}
        </div>
        {data?.chat.lastMessage ? <div className="font-medium text-neutral-500 text-xs mt-1.5 line-clamp-2 text-ellipsis" >
          <span>{data?.chat.lastMessage?.email === session?.user?.email ? 'You' : data?.chat.lastMessage?.username}: </span>{data?.chat?.lastMessage?.message}
        </div> : null}
      </div>
      {data?.chat?.lastMessage ? <div className="flex flex-col items-end gap-1 text-primary/50 dark:text-primary/40">
        <div className="text-xs  font-medium">{formatDate(data?.chat?.lastMessage?.created_at)}</div>
        <CheckCircleIcon className="w-4 h-4 " />
      </div> : null}
    </Link>
  );
};

export default ChatRow;
