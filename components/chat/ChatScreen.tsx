"use client";
import React, { useEffect } from "react";
import ChatSender from "./ChatSender";
import ChatReceiver from "./ChatReceiver";
import { UsersIcon } from "@heroicons/react/24/outline";
import useSWR from "swr";
import { Message } from "@/lib/types";
import { fetcher } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { clientPusher } from "@/pusher";
import { useChatContext } from "../chat-context-provider";

type ChatScreenProps = {
  initialMessages: Message[];
};

const ChatScreen = ({ initialMessages }: ChatScreenProps) => {
  const { chatScreenEndRef, chatName } = useChatContext();
  const pathname = usePathname();
  const { data, error, mutate } = useSWR<{ messages: Message[] }>(
    "/api/getMessages/" + pathname.split("/").pop(),
    fetcher
  );
  const { data: session } = useSession();

  useEffect(() => {
    
    const getMessages = async () => {
      const data = await fetch("/api/getMessages/" + pathname.split("/").pop()).then((res) => res.json());
      return { messages: data.messages };
    }
    const channel = clientPusher.subscribe(pathname.split("/").pop()!);
    channel.bind("new-message", async (msg: Message) => {
      
      if (
        msg?.id && !data?.messages?.find((item) => item.id === msg?.id)
      ) {
        await mutate(getMessages,
          {
            optimisticData: { messages: [msg, ...(data?.messages || initialMessages)] },
            rollbackOnError: true,
          }
        );
      }
      
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [data?.messages, mutate, pathname]);
  if(!session) return null
  return (
    <div
      id="chat__body"
      className="px-5 flex-1 flex flex-col-reverse transition-all overflow-auto h-full"
    >
      <div ref={chatScreenEndRef} />
      {(data?.messages || initialMessages)?.map((item, index) => {
        const nextId = (data?.messages || initialMessages)?.[index - 1]?.email
        const prevId = (data?.messages || initialMessages)?.[index + 1]?.email

        return (
          <div key={item.id}>
            {session?.user?.email === item.email ? (
              <ChatSender
                nextId={nextId}
                prevId={prevId}
                item={item}
              />
            ) : (
              <ChatReceiver
                nextId={nextId}
                prevId={prevId}
                item={item}
              />
            )}
          </div>
        )
      })}
      <div className="flex flex-col items-center justify-center pt-8 pb-20 w-full">
        <div className="w-32 h-32 rounded-full bg-blue-600/15 flex items-center justify-center">
          <UsersIcon className="w-12 h-12 text-blue-500" />
        </div>
        <div className="mt-4 font-semibold text-2xl text-center text-primary">
          {chatName}
        </div>
      </div>

    </div>
  );
};

export default ChatScreen;
