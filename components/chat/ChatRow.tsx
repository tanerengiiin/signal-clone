"use client";
import React from "react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { Chat } from "@/lib/types";
import { UsersIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
const ChatRow = ({ item }: { item: Chat }) => {
  const pathname = usePathname();
  return (
    <Link
      href={"/chat/" + item.id}
      className={`flex items-start gap-2.5 px-3 py-2.5 rounded-xl hover:bg-primary/5 dark:hover:bg-primary/10 cursor-pointer transition-all ${
        pathname === "/chat/" + item.id ? "bg-primary/5 dark:bg-primary/10" : ""
      }`}
    >
      <div className="w-12 h-12 rounded-full bg-blue-600/15 flex items-center justify-center">
        <UsersIcon className="w-6 h-6 text-blue-500" />
      </div>
      <div className="flex-1">
        <div className="font-semibold text-primary text-sm leading-none">
          {item.chatName}
        </div>
        <div className="font-medium text-primary/60 dark:text-primary/40 text-xs mt-1 line-clamp-2">
          orem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry&apos;s standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book. It has survived not
          only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </div>
      </div>
      <div className="flex flex-col items-end gap-1 text-primary/50 dark:text-primary/40">
        <div className="text-xs  font-medium">Sat</div>
        <CheckCircleIcon className="w-4 h-4 " />
      </div>
    </Link>
  );
};

export default ChatRow;
