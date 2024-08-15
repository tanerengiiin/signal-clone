"use client";
import React, { useEffect, useState } from "react";
import ChatSender from "./ChatSender";
import ChatReceiver from "./ChatReceiver";
import { UsersIcon } from "@heroicons/react/24/outline";
import useSWR from "swr";
import { Message } from "@/lib/types";
import { fetcher } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { clientPusher } from "@/pusher";

type ChatScreenProps = {
  initialMessages: Message[];
};

const ChatScreen = ({ initialMessages }: ChatScreenProps) => {
  const pathname = usePathname();
  const { data, error, mutate } = useSWR<{ messages: Message[] }>(
    "/api/getMessages/" + pathname.split("/").pop(),
    fetcher
  );
  const { data: session } = useSession();
  useEffect(() => {
    setTimeout(() => {
      const chatBody = document.getElementById("chat__body");
      if (chatBody) {
        chatBody.scrollTop = chatBody.scrollHeight;
      }
    }, 500);
  }, []);

  useEffect(() => {
    const channel = clientPusher.subscribe(pathname.split("/").pop()!);
    channel.bind("new-message", async (msg: Message) => {
      if (
        msg?.id &&
        !data?.messages?.some((message) => message.id === msg.id)
      ) {
        await mutate(
          () => fetcher("/api/getMessages/" + pathname.split("/").pop()),
          {
            optimisticData: { messages: [msg, ...(data?.messages || [])] },
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

  return (
    <div
      id="chat__body"
      className="px-5 flex-1 flex flex-col transition-all overflow-auto h-full"
    >
      <div className="pt-8 pb-20 w-full flex items-center justify-center">
        <div>
          <div className="w-32 h-32 rounded-full bg-blue-600/15 flex items-center justify-center">
            <UsersIcon className="w-12 h-12 text-blue-500" />
          </div>
          <div className="mt-4 font-semibold text-2xl text-center text-primary">
            Group
          </div>
        </div>
      </div>
      {(data?.messages || initialMessages)?.map((item, index) =>
        session?.user?.email === item.email ? (
          <ChatSender
            key={index}
            nextId={data?.messages?.[index + 1]?.email}
            prevId={data?.messages?.[index - 1]?.email}
            item={item}
          />
        ) : (
          <ChatReceiver
            key={index}
            nextId={data?.messages?.[index + 1]?.email}
            prevId={data?.messages?.[index - 1]?.email}
            item={item}
          />
        )
      )}
    </div>
  );
};

export default ChatScreen;
